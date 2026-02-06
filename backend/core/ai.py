# pyre-ignore-all-errors[21]
import os
from mistralai import Mistral
from dotenv import load_dotenv
from pathlib import Path
from typing import Optional
import json
import base64

# Load environment variables from multiple possible locations
_base = Path(__file__).resolve().parent.parent
for env_file in [_base / ".env", _base.parent / ".env"]:
    if env_file.exists():
        load_dotenv(dotenv_path=env_file)
        break
else:
    load_dotenv()  # fallback to cwd

# Configure Mistral (Get key from console.mistral.ai)
api_key = (os.getenv("MISTRAL_API_KEY") or "").strip().strip('"').strip("'")
if not api_key:
    print("WARNING: MISTRAL_API_KEY not found in .env. Please add it for AI features!")

# Initialize Mistral Client
MODEL_NAME = "mistral-small-latest"
IMAGE_MODEL = "pixtral-12b-2409"

client = Mistral(api_key=api_key or "missing_key")

async def analyze_toxicity(text: str) -> str:
    """
    Analyze text for toxicity using Mistral Small
    Returns a score 0-100 and brief explanation
    """
    prompt = f"""
    You are a hate speech detection engine. Analyze the following text for toxicity, hate speech, and offensive content.
    
    Text: "{text}"
    
    Provide a response in this EXACT format:
    Rating: [0-100]
    Reason: [1 sentence explanation]
    
    0 = Completely safe/positive
    100 = Extreme hate speech/violence
    """
    
    try:
        chat_response = await client.chat.complete_async(
            model=MODEL_NAME,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return chat_response.choices[0].message.content
    except Exception as e:
        return f"Error analyzing text: {str(e)}"

async def analyze_image(image_data: Optional[str] = None, image_url: Optional[str] = None, description: Optional[str] = None) -> str:
    """
    Analyze image for hate speech using Pixtral (Mistral Vision)
    """
    prompt = "Analyze this image for hate speech, offensive symbols, or toxic content. Provide a toxicity rating (0-100) and explanation."
    if description:
        prompt += f"\nContext: {description}"

    try:
        messages = []
        if image_url:
            messages = [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": image_url}
                    ]
                }
            ]
        elif image_data:
            # Ensure base64 prefix is correct
            if "data:image" not in image_data:
                image_data = f"data:image/jpeg;base64,{image_data}"
                
            messages = [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": image_data}
                    ]
                }
            ]
        else:
            return "No image provided"

        chat_response = await client.chat.complete_async(
            model=IMAGE_MODEL,
            messages=messages
        )
        return chat_response.choices[0].message.content
    except Exception as e:
        err = str(e)
        if "401" in err or "Unauthorized" in err:
            return (
                "Error analyzing image (Pixtral): 401 Unauthorized. "
                "Check your MISTRAL_API_KEY in backend/.env - get a valid key from console.mistral.ai"
            )
        return f"Error analyzing image (Pixtral): {err}"

async def generate_reply_options(text: str) -> dict:
    """
    Generate de-escalation reply options
    """
    prompt = f"""
    Help me reply to this potentially toxic comment: "{text}"
    
    Generate 3 constructive responses:
    1. Polite (kill them with kindness)
    2. Educational (correcting facts/bias)
    3. Firm (setting boundaries)
    
    Return ONLY a JSON object: {{ "polite": "...", "educational": "...", "firm": "..." }}
    """
    
    try:
        chat_response = await client.chat.complete_async(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful JSON generator. Output only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        content = chat_response.choices[0].message.content
        return json.loads(content)
    except:
        return {
            "polite": "I respectfully disagree.",
            "educational": "That is not accurate.",
            "firm": "Please be respectful."
        }

async def generate_civilized_version(text: str) -> str:
    """
    Rewrite toxic text to be civil
    """
    prompt = f"""
    Rewrite this text to be polite and constructive, removing toxicity:
    "{text}"
    """
    try:
        chat_response = await client.chat.complete_async(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}]
        )
        return chat_response.choices[0].message.content.strip()
    except:
        return text.strip()
