import { Link } from 'react-router-dom'

const Documentation = () => {
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
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="glass-panel p-6 sm:p-8 lg:p-12 rounded-large shadow-custom">
          <h1 className="font-heading text-4xl sm:text-5xl text-slate-100 mb-4 sm:mb-6">
            Documentation
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8">
            <section>
              <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-3 sm:mb-4">Overview</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Linguist.ai is a powerful N-gram analysis tool that decomposes text into constituent N-grams 
                and calculates perplexity scores based on pre-trained language models. This tool helps you 
                understand the statistical properties of text and evaluate language model performance.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-3 sm:mb-4">Getting Started</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-xl text-slate-200 mb-2">1. Enter Your Text</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Type or paste your text into the input field. The system supports any text corpus, 
                    from single sentences to large documents.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-slate-200 mb-2">2. Execute Analysis</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Click the "Execute Analysis" button to process your text. The system will generate 
                    N-grams and calculate various statistics.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-slate-200 mb-2">3. View Results</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Explore the results through different N-gram views (Unigrams, Bigrams, Trigrams, 4-grams) 
                    and review perplexity, entropy, and token statistics.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-3 sm:mb-4">Understanding Metrics</h2>
              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                  <h3 className="font-heading text-lg text-amber-300 mb-2">Perplexity</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Perplexity measures how well a probability model predicts a sample. Lower values indicate 
                    better prediction. A perplexity of 20 means the model is as confused as if it had to 
                    choose uniformly and independently among 20 possibilities.
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                  <h3 className="font-heading text-lg text-amber-300 mb-2">Entropy</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Entropy quantifies the average information content of a random variable. Higher entropy 
                    indicates more uncertainty or randomness in the text.
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-small border border-slate-700">
                  <h3 className="font-heading text-lg text-amber-300 mb-2">N-grams</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    N-grams are contiguous sequences of N items from a given text. Unigrams are single words, 
                    bigrams are pairs of words, trigrams are triplets, and so on. They help analyze language 
                    patterns and predict word sequences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl sm:text-3xl text-amber-400 mb-3 sm:mb-4">Best Practices</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm sm:text-base">
                <li>Use clean, well-formatted text for best results</li>
                <li>Longer texts provide more accurate statistical analysis</li>
                <li>Consider the context when interpreting perplexity scores</li>
                <li>Compare results across different text samples for insights</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Documentation
