from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import math
from collections import Counter, defaultdict
from typing import Dict, List, Tuple
import time

app = Flask(__name__)
# Enable CORS for all routes with proper configuration
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Common stop words
STOP_WORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
}

def tokenize(text: str) -> List[str]:
    """Tokenize text into words, converting to lowercase."""
    # Remove punctuation and split on whitespace
    text = re.sub(r'[^\w\s]', ' ', text.lower())
    tokens = text.split()
    return [token for token in tokens if token.strip()]

def generate_ngrams(tokens: List[str], n: int) -> List[Tuple[str, ...]]:
    """Generate n-grams from tokens."""
    if n == 1:
        return [(token,) for token in tokens]
    return [tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1)]

def calculate_ngram_frequencies(ngrams: List[Tuple[str, ...]]) -> Dict[Tuple[str, ...], int]:
    """Calculate frequency of each n-gram."""
    return Counter(ngrams)

def calculate_probabilities(frequencies: Dict[Tuple[str, ...], int], total: int) -> Dict[Tuple[str, ...], float]:
    """Calculate probability of each n-gram."""
    return {ngram: count / total for ngram, count in frequencies.items()}

def calculate_entropy(probabilities: Dict[Tuple[str, ...], float]) -> float:
    """Calculate entropy from probabilities."""
    entropy = 0.0
    for prob in probabilities.values():
        if prob > 0:
            entropy -= prob * math.log2(prob)
    return entropy

def calculate_perplexity(entropy: float) -> float:
    """Calculate perplexity from entropy."""
    return 2 ** entropy if entropy > 0 else float('inf')

def format_ngram(ngram: Tuple[str, ...]) -> str:
    """Format n-gram tuple as string."""
    return ' '.join(ngram)

@app.route('/', methods=['GET'])
def root():
    """Root endpoint."""
    return jsonify({
        'message': 'N-Gram Analysis API',
        'status': 'running',
        'endpoints': {
            'health': '/api/health',
            'analyze': '/api/analyze'
        }
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'The requested URL was not found on the server.',
        'available_endpoints': ['/api/health', '/api/analyze']
    }), 404

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'message': 'N-Gram Analysis API is running'
    })

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """Analyze text and return N-gram statistics."""
    start_time = time.time()
    
    try:
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({'error': 'Text is required'}), 400
        
        text = data['text']
        if not text or not text.strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Tokenize the text
        tokens = tokenize(text)
        if not tokens:
            return jsonify({'error': 'No valid tokens found in text'}), 400
        
        # Count stop words
        stop_word_count = sum(1 for token in tokens if token in STOP_WORDS)
        
        # Generate n-grams for different n values
        ngram_results = {}
        
        for n in [1, 2, 3, 4]:
            ngrams = generate_ngrams(tokens, n)
            frequencies = calculate_ngram_frequencies(ngrams)
            total_ngrams = len(ngrams)
            probabilities = calculate_probabilities(frequencies, total_ngrams)
            
            # Sort by frequency (descending)
            sorted_ngrams = sorted(frequencies.items(), key=lambda x: x[1], reverse=True)
            
            # Format as list of items
            ngram_items = []
            for idx, (ngram, count) in enumerate(sorted_ngrams[:50], 1):  # Top 50
                prob = probabilities[ngram]
                ngram_items.append({
                    'id': idx,
                    'token': f'"{format_ngram(ngram)}"',
                    'count': count,
                    'probability': round(prob * 100, 2)
                })
            
            # Use appropriate key
            key = 'unigrams' if n == 1 else 'bigrams' if n == 2 else 'trigrams' if n == 3 else '4grams'
            ngram_results[key] = ngram_items
        
        # Calculate entropy and perplexity from unigrams
        unigram_freq = calculate_ngram_frequencies(generate_ngrams(tokens, 1))
        unigram_probs = calculate_probabilities(unigram_freq, len(tokens))
        entropy = calculate_entropy(unigram_probs)
        perplexity = calculate_perplexity(entropy)
        
        # Calculate latency
        latency_ms = round((time.time() - start_time) * 1000, 2)
        
        response = {
            'perplexity': round(perplexity, 2),
            'total_tokens': len(tokens),
            'unique_tokens': len(set(tokens)),
            'stop_words': stop_word_count,
            'entropy': round(entropy, 2),
            'ngrams': ngram_results,
            'latency_ms': latency_ms
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({
            'error': f'Analysis failed: {str(e)}'
        }), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print('Starting N-Gram Analysis API server...')
    print(f'API will be available at http://0.0.0.0:{port}')
    app.run(debug=False, port=port, host='0.0.0.0')
