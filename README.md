# Linguist.ai - N-Gram & Perplexity Analyzer

A modern web application for analyzing text using N-gram decomposition and calculating perplexity scores.

## Features

- **N-Gram Analysis**: Generate and visualize unigrams, bigrams, trigrams, and 4-grams
- **Perplexity Calculation**: Measure language model confidence
- **Entropy Analysis**: Calculate information entropy
- **Real-time Statistics**: Token counts, unique tokens, stop words
- **Beautiful UI**: Modern dark theme with glassmorphism effects

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Python Flask
- Flask-CORS

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/health
Health check endpoint.

### POST /api/analyze
Analyze text and return N-gram statistics.

**Request:**
```json
{
  "text": "Your text to analyze"
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
    "unigrams": [...],
    "bigrams": [...],
    "trigrams": [...],
    "4grams": [...]
  }
}
```

## Usage

1. Start both the frontend and backend servers
2. Open the application in your browser
3. Enter text in the input field
4. Click "Execute Analysis" to analyze the text
5. View results in the visualization panel

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── LinguistApp.tsx    # Main application component
│   ├── services/
│   │   └── api.ts              # API service layer
│   ├── App.tsx                 # Root component with routing
│   └── main.tsx                # Entry point
├── backend/
│   ├── app.py                  # Flask application
│   └── requirements.txt        # Python dependencies
└── package.json                # Node.js dependencies
```

## Development

- Frontend runs on port 5173 (Vite default)
- Backend runs on port 5000
- CORS is enabled for local development

## License

MIT
