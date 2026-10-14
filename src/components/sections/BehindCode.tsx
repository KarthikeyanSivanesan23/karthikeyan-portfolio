import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { ArrowUpRight, Bike, Camera, Code2, Coffee, Compass, PawPrint } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Image } from '../ui/Image'
import { useMediaQuery } from '../../hooks/useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

type Photo = { src: string; alt: string; id: string; category: string; caption: [string, string] }

const photos: Photo[] = [
  { src: '/images/personal/karthikeyan-lifestyle.jpg', alt: 'Karthikeyan standing beside a car outdoors', id: '01', category: 'LIFE', caption: ['SIMPLE LIVING.', 'HIGH THINKING.'] },
]

const bio = [
  "I'm Karthikeyan S, a Full Stack Developer & Data Analyst who enjoys turning ideas into real digital products.",
  'My journey spans software development, data analytics, and healthcare operations. I\u2019ve worked professionally with React, Angular, Django and WordPress, while also gaining experience in data validation, reporting and analysis.',
  'I work across Python, Java, JavaScript, TypeScript, React.js, Next.js, Angular, Django, Three.js, SQL, Power BI and Generative AI, with a strong interest in building intelligent, interactive and visually engaging applications.',
  'I don\u2019t just enjoy writing code \u2014 I enjoy solving problems, experimenting with new technologies and transforming concepts into products people can actually use.',
]

const sideLeft = ['DEVELOPER', 'CREATOR', 'PROBLEM SOLVER', 'LIFELONG LEARNER']
const sideRight = ['PASSION', 'DISCIPLINE', 'CREATIVITY', 'FREEDOM']
const interests = [
  { label: 'CODE', icon: Code2 },
  { label: 'RIDE', icon: Bike },
  { label: 'CAPTURE', icon: Camera },
  { label: 'PETS', icon: PawPrint },
  { label: 'COFFEE', icon: Coffee },
  { label: 'EXPLORE', icon: Compass },
]

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const card = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const fine = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!fine || !card.current || !tilt.current || !media.current) return
    const bounds = card.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    tilt.current.style.setProperty('--tilt-x', `${((y - .5) * -5).toFixed(2)}deg`)
    tilt.current.style.setProperty('--tilt-y', `${((x - .5) * 6).toFixed(2)}deg`)
    media.current.style.setProperty('--p-x', `${((x - .5) * -5).toFixed(2)}`)
    media.current.style.setProperty('--p-y', `${((y - .5) * -5).toFixed(2)}`)
    card.current.style.setProperty('--mouse-x', `${(x * 100).toFixed(2)}%`)
    card.current.style.setProperty('--mouse-y', `${(y * 100).toFixed(2)}%`)
  }
  const handleLeave = () => {
    if (!fine) return
    tilt.current?.style.setProperty('--tilt-x', '0deg')
    tilt.current?.style.setProperty('--tilt-y', '0deg')
    media.current?.style.setProperty('--p-x', '0')
    media.current?.style.setProperty('--p-y', '0')
  }

  return (
    <div className={`bnc-slot bnc-slot-${index + 1}`}>
      <div className="bnc-card" ref={card} data-cursor="VIEW" role="group" aria-label={photo.category} onPointerMove={handleMove} onPointerLeave={handleLeave}>
        <div className="bnc-tilt" ref={tilt}>
          <div className="bnc-frame">
            <div className="bnc-media" ref={media}><Image src={photo.src} alt={photo.alt} className="bnc-photo" /></div>
            <div className="bnc-scrim" aria-hidden="true" />
            <div className="bnc-follow" aria-hidden="true" />
            <div className="bnc-content">
              <div className="bnc-badge"><span>{photo.id}</span><span>{photo.category}</span></div>
              <div className="bnc-caption"><strong>{photo.caption[0]}</strong><strong>{photo.caption[1]}</strong></div>
            </div>
            <span className="bnc-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BehindCode() {
  const root = useRef<HTMLElement>(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const desktop = useMediaQuery('(min-width: 1100px)')

  useEffect(() => {
    if (reduced) return
    const context = gsap.context(() => {
      gsap.from('.bnc-head', { y: 54, opacity: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 76%', once: true } })
      gsap.from('.bnc-head-copy', { y: 26, opacity: 0, duration: .9, delay: .1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 76%', once: true } })
      gsap.from('.bnc-card, .bnc-bio', { y: 90, opacity: 0, rotateX: 6, scale: .955, duration: 1.1, stagger: .16, ease: 'power3.out', scrollTrigger: { trigger: '.behind-code-cards', start: 'top 84%', once: true } })
      gsap.from('.bnc-more', { y: 26, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: '.behind-code-cards', start: 'bottom 88%', once: true } })
      if (desktop) {
        gsap.from('.bnc-side', { opacity: 0, duration: 1, stagger: .12, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
        gsap.from('.bnc-sig', { y: 26, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 74%', once: true } })
        gsap.to('.bnc-slot-1', { y: -26, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      }
    }, root)
    return () => context.revert()
  }, [reduced, desktop])

  return (
    <section id="behind-code" className="section behind-code-section" ref={root}>
      <div className="behind-code-scape" aria-hidden="true">
        <div className="bnc-grid" />
        <div className="bnc-glow" />
        <div className="bnc-hair bnc-hair-1" />
        <div className="bnc-hair bnc-hair-2" />
        <span className="bnc-coord bnc-coord-1">GRID / 256 — X:042 Y:013</span>
        <span className="bnc-coord bnc-coord-2">10.7905° N &nbsp; 78.7047° E</span>
        <i className="bnc-particle" /><i className="bnc-particle" /><i className="bnc-particle" /><i className="bnc-particle" /><i className="bnc-particle" />
      </div>
      <div className="container behind-code-container">
        <div className="behind-code-head">
          <div>
            <p className="eyebrow section-label"><span />01 / ABOUT ME</p>
            <h2 className="bnc-head">BEHIND<br /><em>THE CODE</em></h2>
            <p className="bnc-lead bnc-head-copy">A few moments from my journey — the same person who codes, explores, rides, and lives with passion.</p>
          </div>
          <div className="bnc-sig">
            <span className="bnc-sig-name">Karthikeyan S</span>
            <span className="bnc-sig-role eyebrow">FULL STACK DEVELOPER • DATA ANALYST<br />&amp; AI APPLICATION BUILDER</span>
            <span className="bnc-sig-copy">Building intelligent full-stack applications and immersive digital experiences with modern web, data and AI technologies.</span>
          </div>
        </div>
        <div className="behind-code-cards">
          {photos.map((photo, index) => <PhotoCard photo={photo} index={index} key={photo.id} />)}
          <div className="bnc-bio">
            {bio.map(line => <p key={line}>{line}</p>)}
            <p className="bnc-bio-motto">Developer by profession. Builder by mindset. Always learning.</p>
          </div>
        </div>
        <div className="bnc-more">
          <span className="bnc-more-label">MORE THAN A DEVELOPER</span>
          <span className="bnc-more-line" aria-hidden="true" />
          <div className="bnc-more-items">
            {interests.map(({ label, icon: Icon }) => (
              <span className="bnc-more-item" key={label}><Icon /><span>{label}</span></span>
            ))}
          </div>
        </div>
      </div>
      <div className="bnc-side bnc-side-left" aria-hidden="true">{sideLeft.map(word => <span key={word}>{word}</span>)}</div>
      <div className="bnc-side bnc-side-right" aria-hidden="true">{sideRight.map(word => <span key={word}>{word}</span>)}</div>
    </section>
  )
}