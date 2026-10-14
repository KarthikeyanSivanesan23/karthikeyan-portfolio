import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function CustomCursor() {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return
    const target = { x: -100, y: -100 }
    const position = { ...target }
    let magnetic: HTMLElement | null = null
    const move = (event: PointerEvent) => {
      target.x = event.clientX; target.y = event.clientY
      const element = event.target instanceof Element ? event.target : null
      const interactive = element?.closest('a, button, input, textarea, select, summary')
      const intent = element?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor || ''
      ring.current!.dataset.active = interactive ? 'true' : 'false'
      ring.current!.dataset.label = intent
      ring.current!.textContent = intent
      const next = element?.closest<HTMLElement>('[data-magnetic]') || null
      if (magnetic && magnetic !== next) gsap.to(magnetic, { x: 0, y: 0, duration: .4 })
      magnetic = next
      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect()
        gsap.to(magnetic, { x: (target.x - bounds.left - bounds.width / 2) * .12, y: (target.y - bounds.top - bounds.height / 2) * .15, duration: .35, overwrite: true })
      }
    }
    const tick = () => {
      position.x += (target.x - position.x) * .17
      position.y += (target.y - position.y) * .17
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`
      if (ring.current) ring.current.style.transform = `translate3d(${position.x}px,${position.y}px,0)`
    }
    const leave = () => { target.x = -100; target.y = -100 }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    gsap.ticker.add(tick)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('mouseleave', leave); gsap.ticker.remove(tick); if (magnetic) gsap.set(magnetic, { x: 0, y: 0 }) }
  }, [enabled])
  if (!enabled) return null
  return <div aria-hidden="true" className="cursor-system"><div className="cursor-dot" ref={dot} /><div className="cursor-ring" ref={ring} /></div>
}
