import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiService, type AnalysisResponse, type NGramItem, type ApiError } from '../services/api'
import ConnectApiModal from './ConnectApiModal'

const LinguistApp = () => {
  const [inputText, setInputText] = useState(
    'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.'
  )
  const [activeTab, setActiveTab] = useState<'unigrams' | 'bigrams' | 'trigrams' | '4grams'>('unigrams')
  const [charCount, setCharCount] = useState(112)
  const [wordCount, setWordCount] = useState(19)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null)
  const [isApiModalOpen, setIsApiModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setCharCount(inputText.length)
    setWordCount(inputText.trim() ? inputText.trim().split(/\s+/).length : 0)
  }, [inputText])

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiService.analyzeText(inputText)
      setAnalysisData(response)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.message || 'Failed to analyze text. Please check if the backend server is running.')
      console.error('Analysis error:', apiError)
    } finally {
      setLoading(false)
    }
  }

  // Get current n-gram data based on active tab
  const getCurrentNGramData = (): NGramItem[] => {
    if (!analysisData) return []
    return analysisData.ngrams[activeTab] || []
  }

  const nGramData = getCurrentNGramData()

  const tabs = [
    { id: 'unigrams' as const, label: 'Uni-grams' },
    { id: 'bigrams' as const, label: 'Bi-grams' },
    { id: 'trigrams' as const, label: 'Tri-grams' },
    { id: '4grams' as const, label: '4-grams' },
  ]

  return (
    <div className="font-body bg-slate-950 text-slate-200 min-h-screen flex flex-col" style={{ height: 'auto', minHeight: '100%' }}>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-[100] border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-amber-500/50 flex items-center justify-center rounded-small bg-amber-500/10">
              <span className="font-heading text-xl sm:text-2xl text-amber-400 font-bold">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl tracking-wide text-slate-100">
                LINGUIST<span className="text-amber-500">.AI</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest hidden xs:block">N-Gram Analysis Engine</span>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/documentation" className="text-slate-400 hover:text-amber-400 transition-colors text-sm uppercase tracking-wider">
              Documentation
            </Link>
            <Link to="/api-reference" className="text-slate-400 hover:text-amber-400 transition-colors text-sm uppercase tracking-wider">
              API Reference
            </Link>
            <button 
              onClick={() => setIsApiModalOpen(true)}
              className="px-4 xl:px-6 py-2 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all rounded-small text-xs xl:text-sm uppercase tracking-widest"
            >
              Connect API
            </button>
          </div>

          {/* Mobile Menu Button - Top Right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-amber-400 transition-colors relative z-[60]"
            aria-label="Toggle menu"
            {...(isMobileMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown - Clean Style */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-slate-950 border-b-2 border-slate-800 shadow-2xl z-[101] min-h-[200px]">
            <div className="px-4 sm:px-6 py-6 space-y-3">
              <Link
                to="/documentation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-4 text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 transition-all text-sm uppercase tracking-wider text-center border border-slate-700 rounded-small"
              >
                Documentation
              </Link>
              
              <Link
                to="/api-reference"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-4 text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 transition-all text-sm uppercase tracking-wider text-center border border-slate-700 rounded-small"
              >
                API Reference
              </Link>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsApiModalOpen(true)
                }}
                className="w-full px-4 py-4 border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500 transition-all rounded-small text-sm uppercase tracking-widest font-bold"
              >
                Connect API
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay - Behind menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-[99] transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8 xl:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column: Input & Controls */}
        <section className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 sm:gap-6">
          <div className="glass-panel p-4 sm:p-6 lg:p-8 rounded-large shadow-custom h-full flex flex-col">
            <h2 className="font-heading text-2xl sm:text-3xl text-slate-100 mb-2">Input Sequence</h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Enter a corpus or sentence to decompose into constituent N-grams. The engine will calculate perplexity based on the pre-trained language model.
            </p>

            <div className="flex-1 flex flex-col gap-3 sm:gap-4">
              <div className="relative group flex-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-full bg-slate-900/50 border border-slate-700 text-slate-300 p-3 sm:p-4 rounded-small focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none font-body text-sm leading-relaxed"
                  placeholder="Type or paste your text here to begin analysis..."
                />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-[10px] sm:text-xs text-slate-600">
                  {charCount} chars | {wordCount} words
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-2 p-2 sm:p-3 border border-slate-800 rounded-small bg-slate-900/30">
                  <div className={`w-2 h-2 rounded-full ${analysisData ? 'bg-green-500' : 'bg-slate-500'} shadow-[0_0_8px_rgba(34,197,94,0.5)] flex-shrink-0`}></div>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase truncate">Model: GPT-2</span>
                </div>
                <div className="flex items-center gap-2 p-2 sm:p-3 border border-slate-800 rounded-small bg-slate-900/30">
                  <div className={`w-2 h-2 rounded-full ${analysisData ? 'bg-amber-500' : 'bg-slate-500'} shadow-[0_0_8px_rgba(245,158,11,0.5)] flex-shrink-0`}></div>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase truncate">
                    Latency: {analysisData ? `${analysisData.latency_ms}ms` : '--'}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-900/20 border border-red-500/50 rounded-small text-red-400 text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || !inputText.trim()}
                className="mt-3 sm:mt-4 w-full py-3 sm:py-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold uppercase tracking-widest transition-all rounded-small shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Analysis</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Visualization & Results */}
        <section className="lg:col-span-8 xl:col-span-8 flex flex-col gap-4 sm:gap-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Perplexity Card */}
            <div className="glass-panel p-4 sm:p-6 rounded-large border-t-4 border-t-amber-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <path d="M12 2v4" />
                  <path d="m16.2 7.8 2.9-2.9" />
                  <path d="M18 12h4" />
                  <path d="m16.2 16.2 2.9 2.9" />
                  <path d="M12 18v4" />
                  <path d="m4.9 19.1 2.9-2.9" />
                  <path d="M2 12h4" />
                  <path d="m4.9 4.9 2.9 2.9" />
                </svg>
              </div>
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 mb-2">Perplexity Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl sm:text-4xl text-slate-100">
                  {analysisData ? analysisData.perplexity.toFixed(2) : '--'}
                </span>
                {analysisData && (
                  <span className={`text-[10px] sm:text-xs font-bold ${
                    analysisData.perplexity < 20 ? 'text-green-400' : 
                    analysisData.perplexity < 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {analysisData.perplexity < 20 ? 'Low' : analysisData.perplexity < 50 ? 'Medium' : 'High'}
                  </span>
                )}
              </div>
              <div className="w-full bg-slate-800 h-1 mt-3 sm:mt-4 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all"
                  style={{ 
                    width: analysisData 
                      ? `${Math.min((analysisData.perplexity / 100) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-2">
                {analysisData 
                  ? analysisData.perplexity < 20 
                    ? 'Model is confident in prediction.' 
                    : 'Model uncertainty detected.'
                  : 'Run analysis to see results'}
              </p>
            </div>

            {/* Token Count */}
            <div className="glass-panel p-4 sm:p-6 rounded-large border-t-4 border-t-slate-700 relative overflow-hidden">
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 mb-2">Total Tokens</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl sm:text-4xl text-slate-100">
                  {analysisData ? analysisData.total_tokens : '--'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1 mt-3 sm:mt-4">
                <span className="h-5 sm:h-6 px-2 bg-slate-800 rounded text-[10px] sm:text-xs flex items-center text-slate-400 border border-slate-700">
                  Unique: {analysisData ? analysisData.unique_tokens : '--'}
                </span>
                <span className="h-5 sm:h-6 px-2 bg-slate-800 rounded text-[10px] sm:text-xs flex items-center text-slate-400 border border-slate-700">
                  Stop: {analysisData ? analysisData.stop_words : '--'}
                </span>
              </div>
            </div>

            {/* Entropy */}
            <div className="glass-panel p-4 sm:p-6 rounded-large border-t-4 border-t-slate-700 relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 mb-2">Entropy</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl sm:text-4xl text-slate-100">
                  {analysisData ? analysisData.entropy.toFixed(2) : '--'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500">bits</span>
              </div>
              <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-slate-400 font-mono">H(X) = -Σ p(x) log p(x)</div>
            </div>
          </div>

          {/* N-Gram Visualization Tabs */}
          <div className="glass-panel rounded-large flex flex-col flex-1 overflow-hidden min-h-[400px] sm:min-h-[500px]">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-900/50 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest transition-colors whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5 font-bold'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-3 sm:p-4 lg:p-6 flex-1 bg-slate-900/30 overflow-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h3 className="font-heading text-lg sm:text-xl text-slate-200">Frequency Distribution</h3>
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-slate-400 hover:text-amber-400 border border-slate-700 rounded-small hover:border-amber-500/50 transition-colors"
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button 
                    className="p-2 text-amber-400 border border-amber-500/50 bg-amber-500/10 rounded-small transition-colors"
                    title="List view"
                    aria-label="List view"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* List View of N-Grams */}
              <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-2 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 border-b border-slate-800 sticky top-0 bg-slate-900/30 backdrop-blur-sm z-10">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6 sm:col-span-7">Token</div>
                  <div className="col-span-2 sm:col-span-2 text-right">Count</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Prob %</div>
                </div>

                {/* N-Gram Items */}
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <svg
                        className="animate-spin h-8 w-8 text-amber-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-slate-400 text-sm">Analyzing text...</span>
                    </div>
                  </div>
                ) : nGramData.length > 0 ? (
                  nGramData.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-3 bg-slate-800/30 border border-slate-800 rounded-small items-center hover:border-amber-500/30 hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="col-span-1 text-slate-500 font-mono text-[10px] sm:text-xs">
                        {String(item.id).padStart(2, '0')}
                      </div>
                      <div className="col-span-6 sm:col-span-7 font-mono text-amber-100 group-hover:text-amber-400 transition-colors truncate text-xs sm:text-sm">
                        {item.token}
                      </div>
                      <div className="col-span-2 sm:col-span-2 text-right font-mono text-slate-300 text-xs sm:text-sm">{item.count}</div>
                      <div className="col-span-3 sm:col-span-2 text-right">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <span className="text-[10px] sm:text-xs font-mono text-slate-400">{item.probability.toFixed(2)}%</span>
                          <div className="w-8 sm:w-12 h-1 bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-amber-500"
                              style={{ width: `${Math.min(item.probability, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <span className="text-slate-500 text-sm">No data available. Run analysis to see results.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-slate-500 text-[10px] sm:text-xs font-mono text-center sm:text-left">
           
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="#" className="text-slate-500 hover:text-amber-400 text-[10px] sm:text-xs uppercase tracking-widest transition-colors">
             
            </a>
            <a href="#" className="text-slate-500 hover:text-amber-400 text-[10px] sm:text-xs uppercase tracking-widest transition-colors">
             
            </a>
            <a href="https://github.com/KarriDurgaSiva295/NLP_PROJECT" className="text-slate-500 hover:text-amber-400 text-[10px] sm:text-xs uppercase tracking-widest transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Connect API Modal */}
      <ConnectApiModal 
        isOpen={isApiModalOpen} 
        onClose={() => setIsApiModalOpen(false)} 
      />
    </div>
  )
}

export default LinguistApp
