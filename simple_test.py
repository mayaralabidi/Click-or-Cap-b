#!/usr/bin/env python3
import requests
import json

results_file = open("test_output_final.txt", "w")

def print_test(msg):
    print(msg)
    results_file.write(msg + "\n")
    results_file.flush()

print_test("="*60)
print_test("TOXICITY SCORING TEST RESULTS")
print_test("="*60)

BASE_URL = "http://127.0.0.1:8000/decision/analyze-image"

# Test 1
print_test("\nTest 1: TOXIC CONTENT")
try:
    r1 = requests.post(BASE_URL, json={"image_url": "test", "description": "I hate you all idiots"}, timeout=10)
    data1 = r1.json()
    print_test(f"  Input: 'I hate you all idiots'")
    print_test(f"  Result: Action={data1['action']}, Score={data1['score']}")
    print_test(f"  Expected: Action=HIDE, Score=85")
    test1_passed = (data1['action'] == 'HIDE' and int(data1['score']) == 85)
    print_test(f"  Status: {'PASSED' if test1_passed else 'FAILED'}")
except Exception as e:
    print_test(f"  ERROR: {e}")
    test1_passed = False

# Test 2
print_test("\nTest 2: CLEAN CONTENT")
try:
    r2 = requests.post(BASE_URL, json={"image_url": "test", "description": "Hello friend, how are you today?"}, timeout=10)
    data2 = r2.json()
    print_test(f"  Input: 'Hello friend, how are you today?'")
    print_test(f"  Result: Action={data2['action']}, Score={data2['score']}")
    print_test(f"  Expected: Action=ALLOW, Score=20")
    test2_passed = (data2['action'] == 'ALLOW' and int(data2['score']) == 20)
    print_test(f"  Status: {'PASSED' if test2_passed else 'FAILED'}")
except Exception as e:
    print_test(f"  ERROR: {e}")
    test2_passed = False

# Test 3
print_test("\nTest 3: MILDLY OFFENSIVE")
try:
    r3 = requests.post(BASE_URL, json={"image_url": "test", "description": "That's inappropriate behavior"}, timeout=10)
    data3 = r3.json()
    print_test(f"  Input: 'That's inappropriate behavior'")
    print_test(f"  Result: Action={data3['action']}, Score={data3['score']}")
    print_test(f"  Expected: Action=WARN, Score=55")
    test3_passed = (data3['action'] == 'WARN' and int(data3['score']) == 55)
    print_test(f"  Status: {'PASSED' if test3_passed else 'FAILED'}")
except Exception as e:
    print_test(f"  ERROR: {e}")
    test3_passed = False

# Summary
print_test("\n" + "="*60)
print_test("SUMMARY")
print_test("="*60)
passed_count = sum([test1_passed, test2_passed, test3_passed])
print_test(f"Tests Passed: {passed_count}/3")

if passed_count == 3:
    print_test("[SUCCESS] ALL TESTS PASSED!")
else:
    print_test("[FAILURE] SOME TESTS FAILED")
    if not test1_passed:
        print_test("  - Test 1 (Toxic) FAILED")
    if not test2_passed:
        print_test("  - Test 2 (Clean) FAILED")  
    if not test3_passed:
        print_test("  - Test 3 (Mildly Offensive) FAILED")

results_file.close()
