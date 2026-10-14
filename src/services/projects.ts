import { api, canUseDemo } from './api'
import type { ContentResult, Project } from '../types/content'

export async function getProjects(signal?: AbortSignal): Promise<ContentResult<Project[]>> {
  try { return { data: (await api.get<Project[]>('/projects/', { signal })).data, source: 'api' } }
  catch (error) {
    if (!signal?.aborted && canUseDemo(error)) return { data: (await import('../data/demo')).demoProjects, source: 'demo' }
    throw error
  }
}
export async function getProject(slug: string, signal?: AbortSignal): Promise<ContentResult<Project | null>> {
  try { return { data: (await api.get<Project>(`/projects/${encodeURIComponent(slug)}/`, { signal })).data, source: 'api' } }
  catch (error) {
    if (!signal?.aborted && canUseDemo(error)) return { data: (await import('../data/demo')).demoProjects.find(project => project.slug === slug) || null, source: 'demo' }
    if (typeof error === 'object' && error && 'response' in error && (error.response as { status?: number })?.status === 404) return { data: null, source: 'api' }
    throw error
  }
}
