import { useEffect, useState } from 'react'
import type { ContentResult } from '../types/content'
import { errorMessage } from '../services/api'

export function useContent<T>(loader: (signal: AbortSignal) => Promise<ContentResult<T>>, key = '') {
  const [result, setResult] = useState<ContentResult<T> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setResult(null)
    setError('')
    loader(controller.signal).then(data => {
      if (!controller.signal.aborted) setResult(data)
    }).catch(err => {
      if (!controller.signal.aborted) setError(errorMessage(err))
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [loader, key, attempt])
  return { result, loading, error, retry: () => setAttempt(value => value + 1) }
}
