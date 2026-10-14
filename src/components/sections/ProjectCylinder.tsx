import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from '../ui/ProjectCard'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { Project } from '../../types/content'

export function ProjectCylinder({ projects }: { projects: Project[] }) {
  const simple = useMediaQuery('(max-width: 900px), (prefers-reduced-motion: reduce)')
  const root = useRef<HTMLDivElement>(null)
  const wheel = useRef<HTMLDivElement>(null)
  const snap = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const current = useRef(0)
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (simple || !wheel.current || !root.current) return
    const cards = Array.from(wheel.current.children) as HTMLElement[]
    const position = { value: 0 }
    const step = 360 / Math.max(projects.length, 5)
    cards.forEach((card,i) => { card.style.transform = `rotateX(${-i * step}deg) translateZ(630px)` })
    const draw = () => {
      wheel.current!.style.transform = `translateZ(-630px) rotateX(${position.value * step}deg)`
      const focused = Math.round(position.value)
      cards.forEach((card, i) => { const distance = Math.abs(position.value - i); card.style.opacity = `${Math.max(.08, 1 - distance * .52)}`; card.inert = focused !== i; card.style.filter = distance > 1.2 ? 'brightness(.6)' : 'none' })
      if (current.current !== focused) { current.current = focused; setActive(focused) }
    }
    draw()
    const tween = gsap.to(position, { value: projects.length - 1, ease: 'none', onUpdate: draw, scrollTrigger: { trigger: root.current, start: 'top 96px', end: 'bottom bottom', scrub: .5, invalidateOnRefresh: true } })
    trigger.current = tween.scrollTrigger || null
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => { cancelAnimationFrame(frame); tween.scrollTrigger?.kill(); tween.kill(); trigger.current = null }
  }, [simple, projects.length])
  const go = (index: number) => {
    const target = Math.min(projects.length - 1, Math.max(0, index))
    if (simple && snap.current) { (snap.current.children[target] as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); setActive(target); current.current = target }
    else if (trigger.current) window.scrollTo({ top: trigger.current.start + target / Math.max(projects.length - 1, 1) * (trigger.current.end - trigger.current.start), behavior: 'smooth' })
  }
  return <div ref={root} className={`project-cylinder ${simple ? 'is-snap' : ''}`} style={simple ? undefined : { height: `${Math.max(projects.length * 460, 1000)}px` }}>
    <div className="cylinder-sticky" role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); go(active + 1) } if (event.key === 'ArrowLeft') { event.preventDefault(); go(active - 1) } }}>
      {simple ? <div className="project-snap" ref={snap} onScroll={() => { if (!snap.current) return; const child = snap.current.children[0] as HTMLElement; if (child) { const index = Math.round(snap.current.scrollLeft / (child.offsetWidth + 20)); if (index !== current.current) { current.current = index; setActive(index) } } }}>{projects.map((project, i) => <div className="snap-project" key={project.id}><ProjectCard project={project} index={i} total={projects.length} /></div>)}</div> : <div className="cylinder-stage"><div className="cylinder-center-line" aria-hidden="true" /><div className="cylinder-wheel" ref={wheel}>{projects.map((project, i) => <div className="cylinder-face" key={project.id} aria-label={`${i + 1} of ${projects.length}`}><ProjectCard project={project} index={i} total={projects.length} /></div>)}</div></div>}
      <div className="cylinder-controls"><div className="cylinder-count"><span>{String(active + 1).padStart(2, '0')}</span><span className="count-rule"/><span>{String(projects.length).padStart(2, '0')}</span></div><span className="eyebrow cylinder-instruction">{simple ? 'SWIPE TO DISCOVER' : 'SCROLL TO ROTATE'} <ArrowDown size={12} /></span><div className="cylinder-buttons"><button aria-label="Previous project" onClick={() => go(active - 1)} disabled={active === 0}><ArrowLeft size={17} /></button><button aria-label="Next project" onClick={() => go(active + 1)} disabled={active === projects.length - 1}><ArrowRight size={17} /></button></div></div>
    </div>
  </div>
}
