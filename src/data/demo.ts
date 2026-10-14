import content from '../../content/demo.json'
import type { Product, ProductTier, Project } from '../types/content'

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const demoProjects: Project[] = content.projects.map(project => ({
  ...project,
  category: { name: project.category, slug: slugify(project.category) },
  technologies: project.technologies.map(name => ({ name, slug: slugify(name) })),
  is_demo: project.is_demo ?? true,
  live_url: project.live_url || '',
  source_url: '',
  source_price: project.source_price || null,
  source_currency: project.source_currency || 'INR',
  download_url: project.download_url || '',
  images: [{ image: project.image, alt: `${project.title} ${project.live_url ? 'website preview' : 'interface concept'}`, caption: project.live_url ? 'Live website preview' : 'Original interface study · demonstration artwork' }],
}))

export const demoProducts: Product[] = content.products.map((product, i) => {
  const project = demoProjects.find(item => item.slug === product.slug)!
  const defaults = content.product_defaults
  return {
    id: i + 1, slug: product.slug, name: project.title, category: project.category,
    technologies: project.technologies, description: project.description, image: project.image,
    project_slug: project.slug, version: defaults.version, is_demo: true, live_url: '',
    overview: project.overview, features: project.features, requirements: defaults.requirements,
    documentation: defaults.documentation, installation: defaults.installation,
    license: defaults.license, faq: defaults.faq, images: project.images, reviews: [], checkout_available: false,
    tiers: (['SOURCE', 'PRO', 'CUSTOM'] as const).map((name, index): ProductTier => ({
      id: i * 3 + index + 1, name, price: name === 'SOURCE' ? product.source_price : name === 'PRO' ? product.pro_price : null,
      currency: product.currency, includes: defaults.tier_includes[name],
    })),
  }
})
