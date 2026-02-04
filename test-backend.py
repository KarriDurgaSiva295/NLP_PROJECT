import requests
import json

# Test the backend API
base_url = "http://localhost:5000"

print("Testing backend API...")
print(f"Base URL: {base_url}")

# Test health endpoint
try:
    response = requests.get(f"{base_url}/api/health")
    print(f"\n✓ Health check: {response.status_code}")
    print(f"  Response: {response.json()}")
except Exception as e:
    print(f"\n✗ Health check failed: {e}")

# Test analyze endpoint
try:
    test_text = "The quick brown fox jumps over the lazy dog"
    response = requests.post(
        f"{base_url}/api/analyze",
        json={"text": test_text},
        headers={"Content-Type": "application/json"}
    )
    print(f"\n✓ Analyze endpoint: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"  Perplexity: {data.get('perplexity')}")
        print(f"  Total tokens: {data.get('total_tokens')}")
        print(f"  Latency: {data.get('latency_ms')}ms")
    else:
        print(f"  Error: {response.text}")
except Exception as e:
    print(f"\n✗ Analyze endpoint failed: {e}")

print("\nTest complete!")
