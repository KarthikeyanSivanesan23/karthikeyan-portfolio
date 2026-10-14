import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Navbar } from '../components/common/Navbar'
import { SmoothScroll } from '../components/common/SmoothScroll'
import { CustomCursor } from '../components/common/CustomCursor'
import { GridBackground } from '../components/common/GridBackground'
import { LoadingScreen } from '../components/common/LoadingScreen'
import { Footer } from '../components/common/Footer'

export function RootLayout() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <SmoothScroll /><GridBackground /><CustomCursor /><Navbar />
    <main id="main-content" tabIndex={-1}><motion.div key={pathname} initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(3px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .35, ease: [.22,1,.36,1] }}><Suspense fallback={<LoadingScreen />}><Outlet /></Suspense></motion.div></main><Footer />
  </>
}
