import { Link } from 'react-router-dom'
import { useState } from 'react'

const ApiReference = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const codeExamples = {
    health: `curl http://localhost:5000/api/health`,
    analyze: `curl -X POST http://localhost:5000/api/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"text": "The quick brown fox jumps over the lazy dog"}'`,
    javascript: `const response = await fetch('http://localhost:5000/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'The quick brown fox jumps over the lazy dog'
  })
});
const data = await response.json();`,
    python: `import requests

response = requests.post(
    'http://localhost:5000/api/analyze',
    json={'text': 'The quick brown fox jumps over the lazy dog'}
)
data = response.json()`
  }

  return (
    <div className="font-body bg-slate-950 text-slate-200 min-h-screen flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-amber-500/50 flex items-center justify-center rounded-small bg-amber-500/10">
              <span className="font-heading text-xl sm:text-2xl text-amber-400 font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl tracking-wide text-slate-100">
                LINGUIST<span className="text-amber-500">.AI</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest hidden xs:block">N-Gram Analysis Engine</span>
            </div>
          </Link>
          <Link to="/" className="text-amber-400 hover:text-amber-300 text-sm uppercase tracking-wider transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="glass-panel p-6 sm:p-8 lg:p-12 rounded-large shadow-custom space-y-8 sm:space-y-12">
          <h1 className="font-heading text-4xl sm:text-5xl text-slate-100">
            API Reference
          </h1>

          {/* Base URL */}
          <section>
            <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-4">Base URL</h2>
            <div className="bg-slate-900/50 p-4 rounded-small border border-slate-700 font-mono text-sm sm:text-base text-amber-300">
              http://localhost:5000/api
            </div>
          </section>

          {/* Health Endpoint */}
          <section>
            <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-4">Health Check</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-small text-xs font-mono font-bold">GET</span>
                <code className="text-amber-300 font-mono text-sm sm:text-base">/api/health</code>
              </div>
              <p className="text-slate-300 text-sm sm:text-base">Check if the API server is running.</p>
              
              <div className="bg-slate-900/50 p-4 rounded-small border border-slate-700 relative">
                <button
                  onClick={() => copyToClipboard(codeExamples.health, 'health')}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-amber-400 transition-colors"
                  title="Copy code"
                >
                  {copiedEndpoint === 'health' ? '✓ Copied' : '📋'}
                </button>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{codeExamples.health}</code></pre>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                <h3 className="text-amber-300 font-bold mb-2">Response</h3>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{JSON.stringify({ status: 'healthy', message: 'N-Gram Analysis API is running' }, null, 2)}</code></pre>
              </div>
            </div>
          </section>

          {/* Analyze Endpoint */}
          <section>
            <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-4">Analyze Text</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-small text-xs font-mono font-bold">POST</span>
                <code className="text-amber-300 font-mono text-sm sm:text-base">/api/analyze</code>
              </div>
              <p className="text-slate-300 text-sm sm:text-base">Analyze text and return N-gram statistics, perplexity, and entropy.</p>

              <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                <h3 className="text-amber-300 font-bold mb-2">Request Body</h3>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{JSON.stringify({ text: 'string (required)' }, null, 2)}</code></pre>
              </div>

              <div className="space-y-3">
                <h3 className="text-amber-300 font-bold">cURL Example</h3>
                <div className="bg-slate-900/50 p-4 rounded-small border border-slate-700 relative">
                  <button
                    onClick={() => copyToClipboard(codeExamples.analyze, 'analyze')}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Copy code"
                  >
                    {copiedEndpoint === 'analyze' ? '✓ Copied' : '📋'}
                  </button>
                  <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{codeExamples.analyze}</code></pre>
                </div>

                <h3 className="text-amber-300 font-bold">JavaScript Example</h3>
                <div className="bg-slate-900/50 p-4 rounded-small border border-slate-700 relative">
                  <button
                    onClick={() => copyToClipboard(codeExamples.javascript, 'javascript')}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Copy code"
                  >
                    {copiedEndpoint === 'javascript' ? '✓ Copied' : '📋'}
                  </button>
                  <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{codeExamples.javascript}</code></pre>
                </div>

                <h3 className="text-amber-300 font-bold">Python Example</h3>
                <div className="bg-slate-900/50 p-4 rounded-small border border-slate-700 relative">
                  <button
                    onClick={() => copyToClipboard(codeExamples.python, 'python')}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Copy code"
                  >
                    {copiedEndpoint === 'python' ? '✓ Copied' : '📋'}
                  </button>
                  <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{codeExamples.python}</code></pre>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                <h3 className="text-amber-300 font-bold mb-2">Response</h3>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{JSON.stringify({
                  perplexity: 14.2,
                  total_tokens: 24,
                  unique_tokens: 18,
                  stop_words: 4,
                  entropy: 3.82,
                  latency_ms: 45.2,
                  ngrams: {
                    unigrams: [{ id: 1, token: '"the"', count: 2, probability: 8.33 }],
                    bigrams: [],
                    trigrams: [],
                    '4grams': []
                  }
                }, null, 2)}</code></pre>
              </div>
            </div>
          </section>

          {/* Error Responses */}
          <section>
            <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-4">Error Responses</h2>
            <div className="space-y-3">
              <div className="bg-red-900/20 p-4 rounded-small border border-red-500/50">
                <h3 className="text-red-400 font-bold mb-2">400 Bad Request</h3>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{JSON.stringify({ error: 'Text is required' }, null, 2)}</code></pre>
              </div>
              <div className="bg-red-900/20 p-4 rounded-small border border-red-500/50">
                <h3 className="text-red-400 font-bold mb-2">500 Internal Server Error</h3>
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto"><code>{JSON.stringify({ error: 'Analysis failed: error message' }, null, 2)}</code></pre>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ApiReference
