import { useState } from 'react'

interface ConnectApiModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConnectApiModal = ({ isOpen, onClose }: ConnectApiModalProps) => {
  const [apiUrl, setApiUrl] = useState('http://localhost:5000/api')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [saved, setSaved] = useState(false)

  if (!isOpen) return null

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      // Test the API URL
      const testUrl = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`
      
      const response = await fetch(`${testUrl}/health`)
      if (response.ok) {
        setTestResult({ success: true, message: 'Connection successful! API is reachable.' })
      } else {
        setTestResult({ success: false, message: `Connection failed: ${response.status} ${response.statusText}` })
      }
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: `Connection failed: ${error instanceof Error ? error.message : 'Network error'}` 
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    // In a real app, you'd save this to localStorage or a config file
    localStorage.setItem('api_url', apiUrl)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
      // Reload to apply new API URL
      window.location.reload()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md rounded-large shadow-custom border border-amber-500/30 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-slate-100">Connect API</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-amber-400 transition-colors p-1"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              API Base URL
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:5000/api"
              className="w-full bg-slate-900/50 border border-slate-700 text-slate-300 p-3 rounded-small focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              Enter the base URL of your API server (e.g., http://localhost:5000/api)
            </p>
          </div>

          {testResult && (
            <div className={`p-3 rounded-small border ${
              testResult.success 
                ? 'bg-green-900/20 border-green-500/50 text-green-400' 
                : 'bg-red-900/20 border-red-500/50 text-red-400'
            }`}>
              <p className="text-sm">{testResult.message}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleTest}
              disabled={testing || !apiUrl.trim()}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:cursor-not-allowed text-slate-200 font-bold uppercase tracking-widest transition-all rounded-small text-sm flex items-center justify-center gap-2"
            >
              {testing ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={!testResult?.success || saved}
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold uppercase tracking-widest transition-all rounded-small text-sm shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)]"
            >
              {saved ? '✓ Saved' : 'Save & Apply'}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500">
              <strong>Note:</strong> Changing the API URL will reload the application. 
              Make sure your backend server is running at the specified URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectApiModal
