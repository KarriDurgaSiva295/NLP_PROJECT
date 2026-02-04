// Get API URL from localStorage (set by Connect API modal) or environment variable or default
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('api_url')
    if (savedUrl) return savedUrl
  }
  return import.meta.env.VITE_API_URL || 'https://nlp-xxmc.onrender.com/api'
}

export interface AnalysisRequest {
  text: string
  ngram_type?: 'unigrams' | 'bigrams' | 'trigrams' | '4grams'
}

export interface NGramItem {
  id: number
  token: string
  count: number
  probability: number
}

export interface AnalysisResponse {
  perplexity: number
  total_tokens: number
  unique_tokens: number
  stop_words: number
  entropy: number
  ngrams: {
    unigrams: NGramItem[]
    bigrams: NGramItem[]
    trigrams: NGramItem[]
    '4grams': NGramItem[]
  }
  latency_ms: number
}

export interface ApiError {
  message: string
  status?: number
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const baseUrl = getApiBaseUrl()
    const url = `${baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, {
        ...config,
        mode: 'cors',
        credentials: 'omit',
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }))
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          status: response.status,
        } as ApiError
      }

      return await response.json()
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        throw error
      }
      
      // Better error messages for common issues
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred'
      
      // Check for CORS or network errors
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
        throw {
          message: `Cannot connect to API server. Please check if the backend is running at ${baseUrl}. If using Render, make sure the service is active.`,
          status: 0,
        } as ApiError
      }
      
      throw {
        message: errorMessage,
      } as ApiError
    }
  }

  async analyzeText(text: string): Promise<AnalysisResponse> {
    return this.request<AnalysisResponse>('/analyze', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  }

  async getHealth(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>('/health')
  }
}

export const apiService = new ApiService()
