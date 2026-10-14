import { api } from './api'
import type { ContactPayload } from '../types/content'

export async function sendInquiry(payload: ContactPayload) {
  const response = await api.post<{ id: number; message: string }>('/contact/', payload)
  return response.data
}
