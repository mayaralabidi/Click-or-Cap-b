# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages
from pydantic import BaseModel
from typing import Optional

class DecisionRequest(BaseModel):
    """Request model for decision engine"""
    text: Optional[str] = None
    image_url: Optional[str] = None
    analysis_results: Optional[dict] = None

class DecisionResponse(BaseModel):
    """Response from decision engine"""
    action: str  # HIDE, WARN, ALLOW
    score: float
    reason: str
    replacement_content: Optional[str] = None
    empathy_note: Optional[str] = None

class AlternativeRequest(BaseModel):
    """Request for generating alternative text"""
    original_text: str
    mood: str = "polite"  # polite, educational, firm

class AlternativeResponse(BaseModel):
    """Response with alternative text"""
    original: str
    alternative: str
    improvement_note: str

class EmpathyCheckRequest(BaseModel):
    """Request for empathy check"""
    draft_text: str

class EmpathyCheckResponse(BaseModel):
    """Response from empathy check"""
    toxicity: float
    predicted_reaction_emoji: str
    civilized_version: str
    warning_message: str

class DeEscalateRequest(BaseModel):
    """Request for de-escalation assistance"""
    context: str

class DeEscalateResponse(BaseModel):
    """Response with de-escalation options"""
    options: list[str]
    recommended: str
