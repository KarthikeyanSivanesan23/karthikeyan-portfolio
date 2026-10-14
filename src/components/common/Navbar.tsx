import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [ ['Home', 'home'], ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'], ['Store', 'store'], ['Services', 'services'], ['Contact', 'contact'] ]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => { const scroll = () => setScrolled(window.scrollY > 30); scroll(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll) }, [])
  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => {
    if (location.pathname !== '/') { setActive(location.pathname.startsWith('/store') ? 'store' : 'projects'); return }
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) }) }, { rootMargin: '-20% 0px -55% 0px' })
    const timer = window.setTimeout(() => document.querySelectorAll<HTMLElement>('section[id]').forEach(section => observer.observe(section)), 400)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [location.pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    document.getElementById('main-content')?.toggleAttribute('inert', open)
    window.dispatchEvent(new CustomEvent('portfolio:menu', { detail: open }))
    if (!open) return
    const timer = window.setTimeout(() => dialog.current?.querySelector<HTMLAnchorElement>('a')?.focus(), 60)
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const elements = [toggle.current, ...Array.from(dialog.current?.querySelectorAll<HTMLElement>('a, button') || [])].filter(Boolean) as HTMLElement[]
        const first = elements[0], last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', key)
    return () => { clearTimeout(timer); document.body.classList.remove('menu-open'); document.getElementById('main-content')?.removeAttribute('inert'); window.removeEventListener('keydown', key); window.dispatchEvent(new CustomEvent('portfolio:menu', { detail: false })) }
  }, [open])
  const href = (id: string) => id === 'store' ? '/store' : `/#${id}`
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
      <Link to="/" className="logo" aria-label="Karthikeyan S home">KS<span>.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([name,id]) => <Link key={id} to={href(id)} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{name}</Link>)}</nav>
      <Link className="nav-cta" to="/#contact">Let’s Talk <ArrowUpRight size={15} /></Link>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{open && <motion.div ref={dialog} id="mobile-navigation" className="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation" initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }} transition={{ duration: .35, ease: [.22,1,.36,1] }}>
      <p className="eyebrow text-muted">EXPLORE THE LAB</p>
      <nav>{links.map(([name,id], index) => <Link key={id} to={href(id)} onClick={() => setOpen(false)}><span className="eyebrow">0{index + 1}</span>{name}<ArrowUpRight /></Link>)}</nav>
      <div className="mobile-nav-bottom"><span className="status-dot" />Available for projects<span>Based in India</span></div>
    </motion.div>}</AnimatePresence>
  </>
}
