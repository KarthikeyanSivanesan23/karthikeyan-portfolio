import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import type { Project } from '../../types/content'
import { Image } from './Image'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { CheckoutModal } from './CheckoutModal'

export function ProjectCard({ project, index, total, compact = false }: { project: Project; index: number; total: number; compact?: boolean }) {
  const card = useRef<HTMLElement>(null)
  const [checkout, setCheckout] = useState(false)
  const fine = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const number = String(index + 1).padStart(2, '0')
  const preview = <>
    <picture>
      {project.image_poster && <source media="(prefers-reduced-motion: reduce)" srcSet={project.image_poster} />}
      <Image src={project.image} alt={`${project.title} ${project.live_url ? 'website preview' : 'interface concept'}`} />
    </picture>
    <span className="visual-project-number">{number}</span>
    <span className="project-view-label">VIEW PROJECT <ArrowUpRight size={15} /></span>
  </>
  const view = project.live_url
    ? <a className="project-visual" href={project.live_url} target="_blank" rel="noopener noreferrer" data-cursor="VIEW" aria-label={`View ${project.title} live demo`}>{preview}</a>
    : <Link className="project-visual" to={`/projects/${project.slug}`} data-cursor="VIEW" aria-label={`View ${project.title} case study`}>{preview}</Link>
  return <article ref={card} className={`project-card ${compact ? 'project-card-compact' : ''}`} style={{ '--project-accent': project.accent } as React.CSSProperties} onPointerMove={event => {
    if (!fine || !card.current) return
    const bounds = card.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width, y = (event.clientY - bounds.top) / bounds.height
    card.current.style.setProperty('--tilt-x', `${(y - .5) * -3}deg`); card.current.style.setProperty('--tilt-y', `${(x - .5) * 3}deg`)
    card.current.style.setProperty('--mouse-x', `${x * 100}%`); card.current.style.setProperty('--mouse-y', `${y * 100}%`)
  }} onPointerLeave={() => { card.current?.style.setProperty('--tilt-x','0deg'); card.current?.style.setProperty('--tilt-y','0deg') }}>
    {view}
    <div className="project-information">
      <div className="project-card-top"><span className="eyebrow">{project.category.name}</span><span className="eyebrow">{number} / {String(total).padStart(2, '0')}</span></div>
      <h3>{project.live_url ? <a href={project.live_url} target="_blank" rel="noopener noreferrer">{project.title}</a> : <Link to={`/projects/${project.slug}`}>{project.title}</Link>}</h3>
      <p>{project.description}</p>
      <div className="tag-row">{project.technologies.slice(0, 4).map(tech => <span className="pill" key={tech.slug}>{tech.name}</span>)}</div>
      <div className="project-card-bottom">
        {!project.is_demo && project.live_url ? <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-link">Live demo <ArrowUpRight /></a> : <Link to={`/projects/${project.slug}`} className="text-link">Case study <ArrowUpRight /></Link>}
        {project.is_demo && <Link to={`/store/${project.slug}`} className="project-source-link">Source code ↗</Link>}
      </div>
      {project.source_price && <div className="project-buy-row"><div className="project-buy-copy"><span className="eyebrow">Buy source code + docs</span><strong>₹{Number(project.source_price).toLocaleString('en-IN')}</strong></div><button className="project-buy-button" onClick={() => setCheckout(true)}><ShoppingBag size={13} /> Buy now</button></div>}
      {project.is_demo && <span className="demo-label">Demo concept</span>}
      {project.is_demo && project.live_url && <a className="text-link" href={project.live_url} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight /></a>}
      {checkout && <CheckoutModal project={project} onClose={() => setCheckout(false)} />}
    </div>
  </article>
}
