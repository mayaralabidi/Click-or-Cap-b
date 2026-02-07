from fastapi import APIRouter
from typing import Dict, List
import random
from datetime import datetime

router = APIRouter()

# Mock data generators for toxicity statistics
def generate_toxicity_level() -> int:
    """Generate a realistic toxicity percentage (0-100)"""
    return random.randint(15, 75)

def get_severity(level: int) -> str:
    """Classify toxicity level into weather severity"""
    if level < 25:
        return "calm"
    elif level < 45:
        return "moderate"
    elif level < 65:
        return "stormy"
    else:
        return "severe"

def get_trend() -> str:
    """Generate random trend direction"""
    return random.choice(["up", "down", "stable"])

# Country data with realistic toxicity patterns
COUNTRIES = [
    {"name": "United States", "code": "US", "base_toxicity": 55},
    {"name": "United Kingdom", "code": "GB", "base_toxicity": 45},
    {"name": "India", "code": "IN", "base_toxicity": 60},
    {"name": "Brazil", "code": "BR", "base_toxicity": 52},
    {"name": "Germany", "code": "DE", "base_toxicity": 35},
    {"name": "France", "code": "FR", "base_toxicity": 40},
    {"name": "Japan", "code": "JP", "base_toxicity": 28},
    {"name": "Australia", "code": "AU", "base_toxicity": 38},
    {"name": "Canada", "code": "CA", "base_toxicity": 42},
    {"name": "Mexico", "code": "MX", "base_toxicity": 48},
    {"name": "South Africa", "code": "ZA", "base_toxicity": 50},
    {"name": "Nigeria", "code": "NG", "base_toxicity": 58},
    {"name": "Spain", "code": "ES", "base_toxicity": 37},
    {"name": "Italy", "code": "IT", "base_toxicity": 41},
    {"name": "South Korea", "code": "KR", "base_toxicity": 32},
]

@router.get("/global")
async def get_global_stats():
    """Get global toxicity overview"""
    toxicity_level = generate_toxicity_level()
    
    return {
        "platform": "global",
        "toxicityLevel": toxicity_level,
        "severity": get_severity(toxicity_level),
        "trend": get_trend(),
        "lastUpdated": datetime.now().isoformat(),
        "description": "Global average across all platforms"
    }

@router.get("/platforms")
async def get_platform_stats():
    """Get platform-specific toxicity statistics"""
    platforms = ["x", "facebook", "reddit"]
    
    stats = []
    for platform in platforms:
        # X tends to be higher, Facebook moderate, Reddit varies
        base_levels = {"x": 60, "facebook": 45, "reddit": 50}
        toxicity = base_levels[platform] + random.randint(-10, 10)
        
        stats.append({
            "platform": platform,
            "toxicityLevel": toxicity,
            "severity": get_severity(toxicity),
            "trend": get_trend(),
            "lastUpdated": datetime.now().isoformat(),
            "activeUsers": random.randint(100000, 5000000),
            "flaggedContent": random.randint(1000, 50000)
        })
    
    return stats

@router.get("/regions")
async def get_regional_stats():
    """Get geographic/regional toxicity breakdown"""
    regional_data = []
    
    for country in COUNTRIES:
        base = country["base_toxicity"]
        
        # Generate platform-specific variations
        platforms = {
            "x": base + random.randint(-5, 10),
            "facebook": base + random.randint(-10, 5),
            "reddit": base + random.randint(-8, 8)
        }
        
        overall = sum(platforms.values()) // 3
        
        regional_data.append({
            "country": country["name"],
            "countryCode": country["code"],
            "toxicityLevel": overall,
            "severity": get_severity(overall),
            "platforms": platforms,
            "trend": get_trend(),
            "lastUpdated": datetime.now().isoformat()
        })
    
    return regional_data

@router.get("/trends")
async def get_trend_data():
    """Get historical trend data (mock 7-day history)"""
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    trends = {
        "x": [random.randint(50, 70) for _ in days],
        "facebook": [random.randint(35, 55) for _ in days],
        "reddit": [random.randint(40, 60) for _ in days],
        "labels": days
    }
    
    return trends
