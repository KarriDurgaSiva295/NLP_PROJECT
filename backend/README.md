# N-Gram Analysis Backend API

Flask-based backend API for N-gram analysis and perplexity calculation.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "N-Gram Analysis API is running"
}
```

### POST /api/analyze
Analyze text and return N-gram statistics.

**Request:**
```json
{
  "text": "Your text to analyze here"
}
```

**Response:**
```json
{
  "perplexity": 14.2,
  "total_tokens": 24,
  "unique_tokens": 18,
  "stop_words": 4,
  "entropy": 3.82,
  "latency_ms": 45.2,
  "ngrams": {
    "unigrams": [
      {
        "id": 1,
        "token": "\"the\"",
        "count": 2,
        "probability": 8.33
      }
    ],
    "bigrams": [...],
    "trigrams": [...],
    "4grams": [...]
  }
}
```

## Features

- Tokenization and N-gram generation (1-4 grams)
- Frequency and probability calculation
- Entropy and perplexity calculation
- Stop word detection
- CORS enabled for frontend integration
