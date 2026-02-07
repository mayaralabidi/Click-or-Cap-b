import feedparser
import random
import html
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# --- Sources ---
REAL_NEWS_RSS = [
    "http://feeds.bbci.co.uk/news/world/rss.xml",
    "https://www.reutersagency.com/feed/?best-topics=political-general&post_type=best",
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    "http://feeds.npr.org/1001/rss.xml"
]

# Satire is a good proxy for "Fake" news in a game context
SATIRE_NEWS_RSS = [
    "https://www.theonion.com/rss",
    "https://babylonbee.com/feed"
]

# Small sample of hate speech / toxic examples (Controlled dataset for safety)
# In production, this would come from a larger database or API.
HATE_SPEECH_EXAMPLES = [
    {"title": "They are all the same, get them out of our country!", "explanation": "Generalization and exclusion based on group identity."},
    {"title": "Women shouldn't be in the workplace, they belong in the kitchen.", "explanation": "Gender-based discrimination and stereotyping."},
    {"title": "People like that are a disease to society.", "explanation": "Dehumanization, comparing a group to a disease."},
    {"title": "The world would be better off without [Group X].", "explanation": "Call for elimination or violence against a group."},
    {"title": "Stop lying, you [slur] are always trying to cheat us.", "explanation": "Use of slurs and negative stereotyping."}
]

class Card(BaseModel):
    id: str
    text: str
    type: str  # "CLICK" (Real) or "CAP" (Fake/Hate)
    source: str
    explanation: str

import requests

import concurrent.futures

def fetch_single_feed(url):
    try:
        response = requests.get(url, timeout=2.0)
        if response.status_code == 200:
            return feedparser.parse(response.content)
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

def fetch_rss_items(urls, limit=5):
    items = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_url = {executor.submit(fetch_single_feed, url): url for url in urls}
        for future in concurrent.futures.as_completed(future_to_url):
            feed = future.result()
            if feed:
                for entry in feed.entries[:limit]:
                    title = html.unescape(entry.title)
                    items.append({
                        "text": title,
                        "source": feed.feed.title if 'title' in feed.feed else "News Source",
                        "explanation": "This is a real headline from a reputable news source."
                    })
    return items

@router.get("/deck")
async def get_game_deck():
    deck = []
    
    # 1. Fetch Real News (CLICK)
    real_news = fetch_rss_items(REAL_NEWS_RSS, limit=4)
    for item in real_news:
        deck.append({
            "id": f"real_{random.randint(1000, 9999)}",
            "text": item['text'],
            "type": "CLICK",
            "source": item['source'],
            "explanation": item['explanation']
        })

    # 2. Fetch Satire/Fake News (CAP)
    fake_news = fetch_rss_items(SATIRE_NEWS_RSS, limit=4)
    for item in fake_news:
        deck.append({
            "id": f"fake_{random.randint(1000, 9999)}",
            "text": item['text'],
            "type": "CAP",
            "source": item['source'],
            "explanation": "This is a satirical or fake headline."
        })

    # 3. Add Safe Hate Speech Examples (CAP)
    # Select 2 random ones
    hate_samples = random.sample(HATE_SPEECH_EXAMPLES, 2)
    for item in hate_samples:
        deck.append({
            "id": f"hate_{random.randint(1000, 9999)}",
            "text": item['title'],
            "type": "CAP", 
            "source": "Anonymous / Social Media",
            "explanation": f"Hate Speech Detected: {item['explanation']}"
        })

    # Shuffle the deck
    random.shuffle(deck)
    
    return deck
