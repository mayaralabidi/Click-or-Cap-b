# Hate Weather Report - Data Sources Documentation

## Current Implementation: Mock Data (MVP)

### ⚠️ Important: No Real Social Media Data

The Hate Weather Report currently uses **100% simulated/mock data**. No actual social media platforms are being accessed or analyzed.

---

## Why Mock Data?

### Cost Barriers
- **Twitter/X API**: $100 - $5,000/month for enterprise access
- **Facebook Graph API**: Requires business verification + costs
- **Reddit API**: Free tier has severe rate limits (60 requests/minute)

### Technical Challenges
- Rate limiting and quota management
- Authentication complexity
- Real-time data processing infrastructure
- Content moderation API access restrictions

### Legal/Ethical Considerations
- Terms of Service restrictions on data scraping
- Privacy regulations (GDPR, CCPA)
- Ethical concerns about surveillance

---

## Current Data Generation

### Backend: `backend/routers/hate_weather.py`

#### 1. Platform Statistics (`/hate-weather/platforms`)
```python
# Base toxicity levels (hardcoded patterns)
base_levels = {
    "x": 60,        # X tends higher
    "facebook": 45,  # Facebook moderate
    "reddit": 50     # Reddit varies
}

# Add randomness: ±10%
toxicity = base_levels[platform] + random.randint(-10, 10)
```

#### 2. Regional Data (`/hate-weather/regions`)
```python
COUNTRIES = [
    {"name": "United States", "code": "US", "base_toxicity": 55},
    {"name": "United Kingdom", "code": "GB", "base_toxicity": 45},
    {"name": "India", "code": "IN", "base_toxicity": 60},
    # ... 12 more countries
]

# Platform variations per country
platforms = {
    "x": base + random.randint(-5, 10),
    "facebook": base + random.randint(-10, 5),
    "reddit": base + random.randint(-8, 8)
}
```

#### 3. Severity Classification
```python
def get_severity(level: int):
    if level < 25: return "calm"      # ☀️
    elif level < 45: return "moderate" # ⛅
    elif level < 65: return "stormy"   # ⛈️
    else: return "severe"              # 🌪️
```

---

## Future: Real Data Integration Options

### Option 1: Academic Research APIs
- **Perspective API** (Google): Free toxicity detection
- **Hugging Face Models**: Open-source hate speech classifiers
- **Cost**: Free
- **Limitation**: Need to collect your own social media samples

### Option 2: Third-Party Analytics Services
- **Brandwatch**: Social media monitoring ($800-$3000/month)
- **Sprinklr**: Enterprise social listening ($$$$)
- **Cost**: Very expensive
- **Benefit**: Pre-aggregated data

### Option 3: Build Your Own
1. Use free-tier APIs to collect samples
2. Run hate speech detection models locally
3. Aggregate statistics over time
4. **Cost**: Development time + compute resources
5. **Benefit**: Full control, no ongoing API costs

### Option 4: Hybrid Approach (Recommended)
1. Integrate with your existing **Text Analysis** feature
2. Aggregate user-submitted content analysis
3. Build statistics from actual usage
4. **Cost**: Minimal
5. **Benefit**: Real data from your users

---

## Implementation Roadmap

### Phase 1: MVP (Current) ✅
- Mock data for demonstration
- Weather visualization concept
- Platform comparison UI

### Phase 2: User-Generated Data
- Aggregate stats from Text Analysis feature
- Track toxicity trends over time
- Build heat map from user locations (opt-in)

### Phase 3: Real-Time Integration
- Integrate Perspective API for real-time scoring
- Sample public social media posts (within ToS)
- Display actual toxicity metrics

### Phase 4: Advanced Analytics
- Historical trend analysis
- Predictive modeling
- Custom alerts and notifications

---

## Recommended Next Steps

1. **Keep mock data** for now to demonstrate the concept
2. **Add disclaimer** to the dashboard: "Data is simulated for demonstration"
3. **Plan integration** with your existing Text Analysis feature
4. **Research APIs**: Perspective API (free) or academic datasets
5. **Consider user privacy**: If collecting real data, be transparent

---

## Data Accuracy Disclaimer

> **Note**: All toxicity percentages, platform comparisons, and regional statistics are currently **simulated for demonstration purposes only**. They do not reflect actual social media toxicity levels.

For production use, integrate with:
- Google's Perspective API (free, rate-limited)
- Custom hate speech detection models
- User-submitted content analysis from your platform
