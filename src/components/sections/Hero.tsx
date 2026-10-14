import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react'
import gsap from 'gsap'
import { ErrorBoundary } from '../common/ErrorBoundary'
import { CoreFallback } from '../three/CoreFallback'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const DeveloperCore = lazy(() => import('../three/DeveloperCore'))
const labels = ['React', 'Django', 'Python', 'Three.js', 'Node.js', 'PostgreSQL', 'AI', 'TypeScript']

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  useEffect(() => {
    if (reduced) return
    const context = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 30, opacity: 0, duration: .9, stagger: .09, ease: 'power3.out' })
      gsap.to('.hero-copy', { y: 80, opacity: .15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 20%', scrub: true } })
      gsap.to('.core-stage', { y: 40, scale: 1.08, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => context.revert()
  }, [reduced])
  return <section className="hero" id="home" ref={root}>
    <div className="hero-grid" aria-hidden="true" /><div className="hero-orbital-glow" aria-hidden="true" />
    <div className="container hero-inner">
      <div className="hero-topline hero-reveal"><span className="eyebrow">KARTHIKEYAN S <span className="hero-divider">/</span> INDEPENDENT DEVELOPER</span><span className="eyebrow hero-location">11.1271° N &nbsp; 78.6569° E</span></div>
      <div className="hero-copy">
        <div className="availability hero-reveal"><span className="status-dot" /><span>AVAILABLE FOR PROJECTS</span></div>
        <h1 className="hero-reveal">FULL STACK<br /><span>DEVELOPER</span><span className="headline-dot">.</span></h1>
        <div className="hero-intro hero-reveal"><span className="intro-mark"><Asterisk size={24} strokeWidth={1} /></span><h2>I BUILD INTELLIGENT<br />DIGITAL EXPERIENCES.</h2></div>
        <p className="hero-description hero-reveal">Full-stack applications, AI-powered systems and immersive web experiences engineered from frontend to deployment.</p>
        <div className="hero-actions hero-reveal"><a href="#projects" className="button button-primary" data-magnetic>EXPLORE MY WORK <ArrowRight /></a><Link to="/store" className="hero-store-link">BROWSE SOURCE CODE <ArrowUpRight size={14} /></Link></div>
      </div>
      <div className="core-stage">
        <div className="core-crosshair crosshair-tl">+</div><div className="core-crosshair crosshair-br">+</div>
        <span className="core-designation eyebrow">KS—01 / INTELLIGENCE CORE</span>
        <ErrorBoundary fallback={<CoreFallback />}><Suspense fallback={<CoreFallback />}><DeveloperCore /></Suspense></ErrorBoundary>
        <div className="tech-orbit-labels" aria-label="Technologies">{labels.map((label, i) => <span className={`orbit-label label-${i}`} key={label}><i />{label}</span>)}</div>
        <div className="core-readout"><span className="readout-bars" aria-hidden="true"><i/><i/><i/><i/><i/></span><span className="eyebrow">SYSTEM ACTIVE<span className="text-muted">PROCEDURAL / REAL-TIME</span></span><span className="readout-symbol">✳</span></div>
      </div>
      <div className="hero-bottom"><a href="#about" className="scroll-indicator"><span className="scroll-line" /><span className="eyebrow">SCROLL TO EXPLORE</span><ArrowDown size={13} /></a><div className="hero-specialties eyebrow"><span>FULL STACK</span><i /> <span>AI SYSTEMS</span><i /><span>CREATIVE DEVELOPMENT</span></div><span className="eyebrow based-india">BASED IN INDIA <span>↗</span></span></div>
    </div>
  </section>
}
