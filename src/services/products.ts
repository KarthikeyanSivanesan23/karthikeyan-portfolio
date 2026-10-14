import { api, canUseDemo } from './api'
import type { ContentResult, Product } from '../types/content'

export async function getProducts(signal?: AbortSignal): Promise<ContentResult<Product[]>> {
  try { return { data: (await api.get<Product[]>('/products/', { signal })).data, source: 'api' } }
  catch (error) {
    if (!signal?.aborted && canUseDemo(error)) return { data: (await import('../data/demo')).demoProducts, source: 'demo' }
    throw error
  }
}
export async function getProduct(slug: string, signal?: AbortSignal): Promise<ContentResult<Product | null>> {
  try { return { data: (await api.get<Product>(`/products/${encodeURIComponent(slug)}/`, { signal })).data, source: 'api' } }
  catch (error) {
    if (!signal?.aborted && canUseDemo(error)) return { data: (await import('../data/demo')).demoProducts.find(product => product.slug === slug) || null, source: 'demo' }
    if (typeof error === 'object' && error && 'response' in error && (error.response as { status?: number })?.status === 404) return { data: null, source: 'api' }
    throw error
  }
}
