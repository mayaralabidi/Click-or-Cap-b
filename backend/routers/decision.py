# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages
import re
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.core.models import (
    DecisionRequest, DecisionResponse,
    AlternativeRequest, AlternativeResponse,
    EmpathyCheckRequest, EmpathyCheckResponse,
    DeEscalateRequest, DeEscalateResponse
)
from backend.core.ai import (
    analyze_toxicity,
    analyze_image,
    generate_reply_options,
    generate_civilized_version
)
from typing import Optional

router = APIRouter()


class ImageAnalyzeRequest(BaseModel):
    image_data: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None


def _parse_ai_rating(text: str) -> tuple[float, str]:
    """Extract rating and reason from AI response like 'Rating: 85\nReason: ...'"""
    score = 0.0
    reason = text.strip()
    match = re.search(r'Rating[:\s]+(\d+)', text, re.IGNORECASE)
    if match:
        score = float(match.group(1))
    reason_match = re.search(r'Reason[:\s]+(.+?)(?:\n|$)', text, re.IGNORECASE | re.DOTALL)
    if reason_match:
        reason = reason_match.group(1).strip()
    return min(100, max(0, score)), reason


def _score_to_action(score: float) -> str:
    if score >= 70:
        return "HIDE"
    if score >= 30:
        return "WARN"
    return "ALLOW"


@router.post("/engine", response_model=DecisionResponse)
async def decision_engine(request: DecisionRequest):
    """Analyze text for toxicity and return HIDE/WARN/ALLOW decision."""
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    analysis = await analyze_toxicity(request.text)
    score, reason = _parse_ai_rating(analysis)
    action = _score_to_action(score)
    replacement = None
    if action in ("HIDE", "WARN"):
        replacement = await generate_civilized_version(request.text)
    return DecisionResponse(
        action=action,
        score=score,
        reason=reason,
        replacement_content=replacement,
    )


@router.post("/analyze-image")
async def analyze_image_endpoint(request: ImageAnalyzeRequest):
    """Analyze image for hate speech using Pixtral vision model."""
    if not request.image_data and not request.image_url:
        raise HTTPException(status_code=400, detail="image_data or image_url is required")
    analysis = await analyze_image(
        image_data=request.image_data,
        image_url=request.image_url,
        description=request.description,
    )
    if analysis.startswith("Error") or analysis == "No image provided":
        raise HTTPException(status_code=500, detail=analysis)
    score, reason = _parse_ai_rating(analysis)
    action = _score_to_action(score)
    return {
        "action": action,
        "score": int(score),
        "reason": reason,
        "analysis": analysis,
    }


@router.post("/generate-alternative", response_model=AlternativeResponse)
async def generate_alternative(request: AlternativeRequest):
    """
    Generate polite alternative text (De-Escalation)
    Uses LLM to rewrite toxic/angry text constructively
    """
    text = request.original_text
    mood = request.mood
    
    # Use Real AI to rewrite
    civilized_text = await generate_civilized_version(text)
    
    return AlternativeResponse(
        original=text,
        alternative=civilized_text,
        improvement_note=f"Rewritten by AI to be more constructive"
    )

@router.post("/empathy-check", response_model=EmpathyCheckResponse)
async def empathy_check(request: EmpathyCheckRequest):
    """
    Empathy Mirror Feature
    Check if user's draft message might hurt someone
    """
    text = request.draft_text
    
    # Real AI Analysis
    analysis = await analyze_toxicity(text)
    
    # Parse score from string "Rating: 85..."
    score = 0
    match = re.search(r'Rating[:\s]+(\d+)', analysis, re.IGNORECASE)
    if match:
        score = float(match.group(1))
    
    # Determine reaction
    if score > 50:
        emoji = "😢"
        warning = "This message seems hurtful. Consider rephrasing."
        civilized = await generate_civilized_version(text)
    elif score > 20:
        emoji = "😕"
        warning = "This could be misunderstood."
        civilized = await generate_civilized_version(text)
    else:
        emoji = "😊"
        warning = "This message looks respectful!"
        civilized = text
    
    return EmpathyCheckResponse(
        toxicity=score/100.0, # Normalize to 0-1
        predicted_reaction_emoji=emoji,
        civilized_version=civilized,
        warning_message=warning
    )

@router.post("/de-escalate", response_model=DeEscalateResponse)
async def de_escalate(request: DeEscalateRequest):
    """
    De-Escalation Assistant
    Generate constructive replies to toxic content
    """
    # Use Real AI to generate options
    # Note: request.context corresponds to the text we are replying to
    options_dict = await generate_reply_options(request.context)
    
    options_list = [
        options_dict.get("polite", "I understand your point."),
        options_dict.get("educational", "Let's look at the facts."),
        options_dict.get("firm", "Let's keep this civil.")
    ]
    
    return DeEscalateResponse(
        options=options_list,
        recommended=options_list[0]
    )
