import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '../../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -96 } })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    const menu = (event: Event) => (event as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start()
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.addEventListener('portfolio:menu', menu)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.removeEventListener('portfolio:menu', menu) }
  }, [reduced])
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
      else document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' })
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, reduced])
  return null
}
