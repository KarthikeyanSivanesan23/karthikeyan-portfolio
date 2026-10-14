import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '../../types/content'
import { Image } from './Image'
import { formatPrice } from '../../utils/format'

export function ProductCard({ product }: { product: Product }) {
  const tier = product.tiers.find(item => item.name === 'SOURCE') || product.tiers[0]
  return <article className="product-card"><Link className="product-card-image" to={`/store/${product.slug}`} data-cursor="BUY"><Image src={product.image} alt={`${product.name} product concept preview`} /><span className="product-card-type eyebrow">SOURCE CODE + DOCUMENTATION</span><span className="product-arrow"><ArrowUpRight size={19} /></span></Link><div className="product-card-info"><p className="eyebrow text-muted">{product.category.name}</p><h3><Link to={`/store/${product.slug}`}>{product.name}</Link></h3><p className="product-description">{product.description}</p><div className="tag-row">{product.technologies.slice(0,3).map(tech => <span className="pill" key={tech.slug}>{tech.name}</span>)}</div><div className="product-card-price"><div>{product.is_demo && <span className="demo-label">Demo price</span>}<strong>{tier ? formatPrice(tier.price, tier.currency) : 'Inquire'}<small> / SOURCE</small></strong></div><Link className="text-link" to={`/store/${product.slug}`}>Details <ArrowUpRight /></Link></div><div className="product-card-actions"><Link to={`/store/${product.slug}?intent=buy`} className="text-link">BUY / INQUIRE ↗</Link>{product.live_url ? <a href={product.live_url} target="_blank" rel="noopener noreferrer" className="text-link">Live demo ↗</a> : <span className="eyebrow text-muted">LIVE DEMO UNPUBLISHED</span>}</div></div></article>
}
