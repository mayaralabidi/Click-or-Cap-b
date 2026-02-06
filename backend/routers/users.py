# pyre-ignore-all-errors[21, 6, 16]  # Pyre cannot see venv packages
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List, Union
from datetime import datetime

router = APIRouter()

# Pydantic models for users endpoints
class UserActionRequest(BaseModel):
    user_id: str
    action_type: str  # civilized_message, reported_hate, de_escalated_thread

class UserActionResponse(BaseModel):
    success: bool
    points_earned: int
    new_total_score: int
    badge_unlocked: Optional[str] = None

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    username: str
    score: int

class LeaderboardResponse(BaseModel):
    entries: list[LeaderboardEntry]
    total_users: int

class WeatherResponse(BaseModel):
    overall_toxicity: float
    total_analyzed: int
    hide_count: int
    warn_count: int
    allow_count: int

# Type definitions for better IDE support
from typing import TypedDict

class UserDataDict(TypedDict):
    username: str
    score: int
    actions_count: int

# In-memory storage for MVP (replace with Supabase later)
users_db: Dict[str, UserDataDict] = {}
actions_db: List[Dict[str, Union[str, int]]] = []
global_stats: Dict[str, int] = {
    "total_analyzed": 0,
    "hide_count": 0,
    "warn_count": 0,
    "allow_count": 0
}

def get_points_for_action(action_type: str) -> int:
    """Calculate points based on action type"""
    points_map = {
        "civilized_message": 50,  # High reward for self-regulation
        "reported_hate": 20,
        "de_escalated_thread": 30,
        "accepted_alternative": 25
    }
    return points_map.get(action_type, 10)

@router.post("/action", response_model=UserActionResponse)
async def log_user_action(request: UserActionRequest):
    """
    Log a user action and award points
    Backend 3 Core Function
    """
    user_id = request.user_id
    action_type = request.action_type
    
    # Initialize user if not exists
    if user_id not in users_db:
        users_db[user_id] = {  # type: ignore
            "username": f"User_{user_id[:8]}",
            "score": 0,
            "actions_count": 0
        }
    
    # Calculate points
    points = get_points_for_action(action_type)
    
    # Update user score
    user_data = users_db[user_id]
    user_data["score"] = user_data["score"] + points  # type: ignore
    user_data["actions_count"] = user_data["actions_count"] + 1  # type: ignore
    
    # Log action
    actions_db.append({
        "user_id": user_id,
        "action_type": action_type,
        "points": points,
        "timestamp": datetime.now().isoformat()
    })
    
    # Check for badge unlock
    badge: Optional[str] = None
    user_data = users_db[user_id]
    score_value = int(user_data["score"])  # type: ignore
    if score_value >= 100 and score_value < 100 + points:
        badge = "🌟 Kindness Novice"
    elif score_value >= 500 and score_value < 500 + points:
        badge = "🏆 Peace Maker"
    
    return UserActionResponse(
        success=True,
        points_earned=points,
        new_total_score=int(user_data["score"]),  # type: ignore
        badge_unlocked=badge
    )

@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(limit: int = 10) -> LeaderboardResponse:
    """
    Get top users by score
    Backend 3 Core Function
    """
    # Sort users by score
    sorted_users = sorted(
        users_db.items(),
        key=lambda x: int(x[1]["score"]),  # type: ignore
        reverse=True
    )[:limit]
    
    # Format response
    entries: List[LeaderboardEntry] = []
    for idx, (user_id, user_data) in enumerate(sorted_users):
        entries.append(LeaderboardEntry(
            rank=idx + 1,
            user_id=user_id,
            username=str(user_data["username"]),
            score=int(user_data["score"])  # type: ignore
        ))
    
    return LeaderboardResponse(
        entries=entries,
        total_users=len(users_db)
    )

@router.get("/score/{user_id}")
async def get_user_score(user_id: str) -> Dict[str, Union[str, int]]:
    """Get individual user score"""
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = users_db[user_id]
    return {
        "user_id": user_id,
        "username": str(user_data["username"]),
        "score": int(user_data["score"]),  # type: ignore
        "actions_count": int(user_data["actions_count"])  # type: ignore
    }

@router.get("/weather", response_model=WeatherResponse)
async def get_toxicity_weather():
    """
    Hate Weather Report - Global toxicity stats
    Innovation Feature
    """
    total = global_stats["total_analyzed"]
    
    if total == 0:
        overall_toxicity = 0
    else:
        # Calculate weighted toxicity
        hide_weight = global_stats["hide_count"] * 1.0
        warn_weight = global_stats["warn_count"] * 0.5
        overall_toxicity = (hide_weight + warn_weight) / total
    
    return WeatherResponse(
        overall_toxicity=round(overall_toxicity, 2),
        total_analyzed=total,
        hide_count=global_stats["hide_count"],
        warn_count=global_stats["warn_count"],
        allow_count=global_stats["allow_count"]
    )

@router.post("/weather/update")
async def update_weather_stats(action: str):
    """Internal endpoint to update global stats"""
    global_stats["total_analyzed"] += 1
    if action == "HIDE":
        global_stats["hide_count"] += 1
    elif action == "WARN":
        global_stats["warn_count"] += 1
    elif action == "ALLOW":
        global_stats["allow_count"] += 1
    
    return {"success": True}
