# test_mistral_import.py
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent / "backend" / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("MISTRAL_API_KEY")
print(f"Mistral Key Present: {bool(key)}")
if key:
    print(f"Key preview: {key[:4]}...")

try:
    from mistralai import Mistral
    print("Mistral library imported successfully!")
    
    try:
        # Check if Mistral client can be initialized
        client = Mistral(api_key=key or "test")
        print("Mistral client initialized.")
    except Exception as e:
        print(f"Mistral client init failed: {e}")
except ImportError:
    print("ERROR: mistralai library NOT found.")
except Exception as e:
    print(f"Import error: {e}")
