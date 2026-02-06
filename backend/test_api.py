"""
Test script for Click-or-Cap Backend API
Tests Backend 2 (Decision & Innovation) and Backend 3 (Gamification)
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_root():
    """Test root endpoint"""
    print("Testing root endpoint...")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_decision_engine():
    """Test decision engine endpoint"""
    print("Testing decision engine...")
    data = {"text": "I hate you, you are so stupid and dumb"}
    response = requests.post(f"{BASE_URL}/decision/engine", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_empathy_check():
    """Test empathy mirror feature"""
    print("Testing empathy check (Empathy Mirror)...")
    data = {"draft_text": "You are an idiot and I hate you"}
    response = requests.post(f"{BASE_URL}/decision/empathy-check", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_generate_alternative():
    """Test alternative text generation"""
    print("Testing generate alternative (De-Escalation)...")
    data = {"original_text": "This is terrible and you're wrong", "mood": "polite"}
    response = requests.post(f"{BASE_URL}/decision/generate-alternative", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_de_escalate():
    """Test de-escalation assistant"""
    print("Testing de-escalation assistant...")
    data = {"context": "Someone called me names online"}
    response = requests.post(f"{BASE_URL}/decision/de-escalate", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_user_action():
    """Test logging user action and earning points"""
    print("Testing user action (Gamification)...")
    data = {"user_id": "test_user_123", "action_type": "civilized_message"}
    response = requests.post(f"{BASE_URL}/users/action", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_leaderboard():
    """Test leaderboard endpoint"""
    print("Testing leaderboard...")
    response = requests.get(f"{BASE_URL}/users/leaderboard")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

def test_weather():
    """Test hate weather report"""
    print("Testing hate weather report...")
    response = requests.get(f"{BASE_URL}/users/weather")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")

if __name__ == "__main__":
    print("="*60)
    print("CLICK-OR-CAP API TESTS")
    print("="*60 + "\n")
    
    try:
        test_root()
        print("\n" + "-"*60)
        print("BACKEND 2: DECISION & INNOVATION FEATURES")
        print("-"*60 + "\n")
        test_decision_engine()
        test_empathy_check()
        test_generate_alternative()
        test_de_escalate()
        
        print("\n" + "-"*60)
        print("BACKEND 3: GAMIFICATION & USERS")
        print("-"*60 + "\n")
        test_user_action()
        test_leaderboard()
        test_weather()
        
        print("="*60)
        print("ALL TESTS COMPLETED")
        print("="*60)
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to server. Make sure it's running on port 8000")
    except Exception as e:
        print(f"ERROR: {e}")
