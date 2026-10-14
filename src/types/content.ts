export interface Technology { name: string; slug: string }
export interface Category { name: string; slug: string }
export interface ProjectImage { image: string; alt: string; caption: string }
export interface Project {
  id: number
  slug: string
  title: string
  category: Category
  description: string
  technologies: Technology[]
  image: string
  image_poster?: string
  accent: string
  featured: boolean
  is_demo: boolean
  live_url: string
  source_url: string
  overview: string
  problem: string
  solution: string
  features: string[]
  architecture: string[]
  challenges: string
  api_overview: string[]
  database: string
  lessons: string
  images: ProjectImage[]
  source_price: string | null
  source_currency: string
  download_url: string
}
export interface ProductTier {
  id: number
  name: 'SOURCE' | 'PRO' | 'CUSTOM'
  price: string | null
  currency: string
  includes: string[]
}
export interface Review { id: number; name: string; rating: number; text: string; created_at: string }
export interface Product {
  id: number
  slug: string
  name: string
  category: Category
  technologies: Technology[]
  description: string
  image: string
  project_slug: string
  version: string
  is_demo: boolean
  live_url: string
  overview: string
  features: string[]
  requirements: string[]
  documentation: string
  installation: string[]
  license: string
  faq: { question: string; answer: string }[]
  tiers: ProductTier[]
  reviews: Review[]
  images: ProjectImage[]
  checkout_available: boolean
}
export interface ContentResult<T> { data: T; source: 'api' | 'demo' }
export interface ContactPayload {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  website: string
}
