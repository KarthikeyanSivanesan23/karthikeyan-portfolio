import axios from 'axios'

export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, ''),
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'The studio is temporarily offline. Your message hasn’t been sent. Please try again shortly.'
    if (error.response.status === 429) return 'A few too many requests. Please wait a minute and try again.'
    const data = error.response.data as Record<string, unknown>
    if (typeof data?.detail === 'string') return data.detail
    const first = Object.values(data || {})[0]
    if (Array.isArray(first)) return String(first[0])
  }
  return 'Something interrupted the connection. Please try again.'
}

export function canUseDemo(error: unknown): boolean {
  return axios.isAxiosError(error) && (!error.response || error.response.status >= 500)
}
