#!/usr/bin/env python3
"""Test Click-or-Cap toxicity scoring endpoint"""

import requests
import json
import time
import sys

BASE_URL = "http://127.0.0.1:8000/decision/analyze-image"
HEALTH_URL = "http://127.0.0.1:8000/health"

def wait_for_server(max_attempts=15):
    """Wait for server to be ready"""
    print("Waiting for server to initialize...", flush=True)
    for attempt in range(max_attempts):
        try:
            response = requests.get(HEALTH_URL, timeout=2)
            if response.status_code == 200:
                print("✓ Server is ready!", flush=True)
                return True
        except requests.exceptions.RequestException:
            print(f"  Attempt {attempt+1}/{max_attempts}...", end="\r", flush=True)
            time.sleep(2)
    
    print("\n✗ Server failed to start", flush=True)
    return False

def test_toxicity(description, text, expected_action, expected_score):
    """Test toxicity detection"""
    print(f"\n{'='*60}")
    print(f"Test: {description}")
    print(f"Input: {text}")
    
    payload = {
        "image_url": "https://example.com/test.png",
        "description": text
    }
    
    try:
        response = requests.post(
            BASE_URL,
            json=payload,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            action = data.get("action")
            score = data.get("score")
            
            print(f"Response: Action={action}, Score={score}")
            print(f"Expected: Action={expected_action}, Score={expected_score}")
            
            if action == expected_action and int(score) == expected_score:
                print("✓ PASSED")
                return True
            else:
                print("✗ FAILED - Mismatch")
                return False
        else:
            print(f"✗ ERROR: HTTP {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return False

if __name__ == "__main__":
    print("\n" + "="*60)
    print("CLICK-OR-CAP TOXICITY SCORING TEST SUITE")
    print("="*60)
    
    # Wait for server
    if not wait_for_server():
        sys.exit(1)
    
    # Run tests
    results = []
    
    results.append(test_toxicity(
        "Toxic Content (High)",
        "I hate you all idiots",
        "HIDE",
        85
    ))
    
    results.append(test_toxicity(
        "Clean Content (Low)", 
        "Hello friend, how are you today?",
        "ALLOW",
        20
    ))
    
    results.append(test_toxicity(
        "Mildly Offensive (Medium)",
        "That's inappropriate and somewhat offensive",
        "WARN",
        55
    ))
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print("="*60)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("✓ All tests passed!")
        sys.exit(0)
    else:
        print("✗ Some tests failed")
        sys.exit(1)
