#!/usr/bin/env python3
"""
Final toxicity scoring tests
"""
import requests
import json
import time
import sys

# Fix Windows encoding
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000/decision/analyze-image"

def test_endpoint(name, text, expected_action, expected_score):
    """Test endpoint and return pass/fail"""
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"Input: '{text}'")
    print(f"Expected: Action={expected_action}, Score={expected_score}")
    
    payload = {
        "image_url": "https://example.com/test.png",
        "description": text
    }
    
    try:
        response = requests.post(BASE_URL, json=payload, timeout=10)
        data = response.json()
        action = data['action']
        score = data['score']
        
        print(f"Result: Action={action}, Score={score}")
        
        # Check if passed
        passed = (action == expected_action and int(score) == int(expected_score))
        status = "[PASSED]" if passed else "[FAILED]"
        print(status)
        
        # Show first part of analysis
        analysis = data.get('analysis', '')
        print(f"Analysis preview: {analysis[:150]}...")
        
        return passed
    except Exception as e:
        print("[ERROR]")
        print(f"Error Details: {e}")
        return False

# Run all tests
print("="*60)
print("CLICK-OR-CAP TOXICITY SCORING TEST SUITE")
print("="*60)

results = []

# Test 1: Toxic content
results.append(test_endpoint(
    "Toxic Content (Should HIDE)",
    "I hate you all idiots",
    "HIDE",
    85
))

time.sleep(1)

# Test 2: Clean content
results.append(test_endpoint(
    "Clean Content (Should ALLOW)",
    "Hello friend, how are you today?",
    "ALLOW",
    20
))

time.sleep(1)

# Test 3: Mildly offensive
results.append(test_endpoint(
    "Mildly Offensive (Should WARN)",
    "That's inappropriate and offensive behavior",
    "WARN",
    55
))

# Summary
print(f"\n{'='*60}")
print("SUMMARY")
print("="*60)
passed = sum(results)
total = len(results)
print(f"Passed: {passed}/{total}")

if passed == total:
    print("[SUCCESS] ALL TESTS PASSED!")
    exit(0)
else:
    print("[FAILURE] SOME TESTS FAILED")
    exit(1)
