# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages
from fastapi import APIRouter, HTTPException
from backend.core.models import (
    DecisionRequest, DecisionResponse,
    AlternativeRequest, AlternativeResponse,
    EmpathyCheckRequest, EmpathyCheckResponse,
    DeEscalateRequest, DeEscalateResponse
)
import random

router = APIRouter()

def calculate_hate_score(analysis_results: dict) -> float:
    """
    Calculate hate score based on analysis results from Backend 1
    Returns a score between 0 and 100
    """
    # Mock implementation - will integrate with real analysis
    toxicity = analysis_results.get("toxicity", 0)
    hate_speech = analysis_results.get("hate_speech", 0)
    offensive_words = analysis_results.get("offensive_words", 0)
    
    # Weighted formula
    score = (toxicity * 0.4 + hate_speech * 0.4 + offensive_words * 0.2) * 100
    return min(100, max(0, score))

def determine_action(score: float) -> str:
    """Determine action based on hate score"""
    if score >= 70:
        return "HIDE"
    elif score >= 40:
        return "WARN"
    else:
        return "ALLOW"

@router.post("/engine", response_model=DecisionResponse)
async def decision_engine(request: DecisionRequest):
    """
    Main decision engine - analyzes content and decides action
    Backend 2 Core Function
    """
    # Mock analysis if not provided
    if not request.analysis_results:
        # Simple mock based on text
        if request.text:
            text_lower = request.text.lower()
            toxicity = 0.8 if any(word in text_lower for word in ["hate", "stupid", "idiot"]) else 0.2
            analysis_results = {
                "toxicity": toxicity,
                "hate_speech": toxicity * 0.9,
                "offensive_words": 0.5 if "fuck" in text_lower else 0
            }
        else:
            analysis_results = {"toxicity": 0, "hate_speech": 0, "offensive_words": 0}
    else:
        analysis_results = request.analysis_results
    
    score = calculate_hate_score(analysis_results)
    action = determine_action(score)
    
    # Generate reason
    if action == "HIDE":
        reason = "Content contains severe hate speech or toxic language"
        replacement = "🌸 This content has been hidden to maintain a positive space."
    elif action == "WARN":
        reason = "Content may contain inappropriate language"
        replacement = "⚠️ Content flagged for review"
    else:
        reason = "Content is acceptable"
        replacement = None
    
    return DecisionResponse(
        action=action,
        score=score,
        reason=reason,
        replacement_content=replacement
    )

@router.post("/generate-alternative", response_model=AlternativeResponse)
async def generate_alternative(request: AlternativeRequest):
    """
    Generate polite alternative text (De-Escalation)
    Uses LLM to rewrite toxic/angry text constructively
    """
    # Mock implementation - will integrate OpenAI/Gemini later
    text = request.original_text
    mood = request.mood
    
    # Simple hardcoded alternatives for demo
    alternatives = {
        "polite": f"I respectfully disagree with your perspective on this matter.",
        "educational": f"Let me share some facts that might help clarify this topic.",
        "firm": f"I understand your frustration, but I must point out that this approach isn't constructive."
    }
    
    return AlternativeResponse(
        original=text,
        alternative=alternatives.get(mood, alternatives["polite"]),
        improvement_note=f"Rewritten in a {mood} tone to promote healthy discussion"
    )

@router.post("/empathy-check", response_model=EmpathyCheckResponse)
async def empathy_check(request: EmpathyCheckRequest):
    """
    Empathy Mirror Feature
    Check if user's draft message might hurt someone
    """
    text = request.draft_text.lower()
    
    # Simple toxicity detection
    toxic_words = ["hate", "stupid", "idiot", "dumb", "moron", "fuck"]
    toxicity = sum(1 for word in toxic_words if word in text) / len(toxic_words)
    
    # Determine reaction
    if toxicity > 0.5:
        emoji = "😢"
        warning = "This message might hurt someone's feelings. Consider being kinder."
        civilized = "I disagree with your point, but I'd like to understand your perspective better."
    elif toxicity > 0.2:
        emoji = "😕"
        warning = "This message could be misunderstood. Maybe soften the tone?"
        civilized = request.draft_text  # Minor adjustment needed
    else:
        emoji = "😊"
        warning = "This message looks respectful!"
        civilized = request.draft_text
    
    return EmpathyCheckResponse(
        toxicity=toxicity,
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
    options = [
        "I understand you feel strongly about this. Can we discuss the facts calmly?",
        "Let's focus on the issue rather than personal attacks.",
        "I see your point, but let me offer a different perspective based on evidence."
    ]
    
    return DeEscalateResponse(
        options=options,
        recommended=options[0]
    )
