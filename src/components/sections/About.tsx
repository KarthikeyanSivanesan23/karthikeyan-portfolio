import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Braces, Cloud, Cpu, Database, Layers, Workflow } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const systems = [
  { name: 'Frontend', detail: 'Interfaces that feel as good as they function.', stack: 'REACT / TYPESCRIPT', icon: Layers },
  { name: 'API', detail: 'Clear contracts. Reliable communication.', stack: 'REST / AUTHENTICATION', icon: Workflow },
  { name: 'Backend', detail: 'The quiet engineering behind every interaction.', stack: 'DJANGO / NODE.JS', icon: Braces },
  { name: 'Database', detail: 'Structure, integrity and room to grow.', stack: 'POSTGRESQL / MONGODB', icon: Database },
  { name: 'AI', detail: 'Intelligence with intention, grounded in context.', stack: 'LLM / RAG / AGENTS', icon: Cpu },
  { name: 'Deployment', detail: 'From an idea on localhost to a useful product.', stack: 'CLOUD / CI / DELIVERY', icon: Cloud },
]

export function About() {
  const [active, setActive] = useState(2)
  const current = systems[active]
  return <section id="about" className="section about-section container">
    <Reveal className="about-copy"><p className="eyebrow section-label"><span />01 / ABOUT</p><h2>ENGINEERING<br />BEYOND THE<br /><em>ORDINARY.</em></h2><p className="about-lead">A developer’s logic.<br />A creator’s curiosity.</p><p>I’m Karthikeyan — a full-stack developer and AI application builder based in India. I connect thoughtful interfaces with capable systems to turn complex ideas into intuitive digital products.</p><p>From the first component to the final deployment, I care about the details that make software genuinely useful. And the unexpected ones that make it memorable.</p><a className="text-link" href="#contact">Let’s build something considered <ArrowUpRight /></a></Reveal>
    <Reveal className="system-diagram" delay={.12}><div className="diagram-header"><span className="eyebrow">THE CONNECTED STACK</span><span className="eyebrow text-muted">06 LAYERS / ONE VISION</span></div><div className="system-flow">{systems.map(({ name, stack, icon: Icon }, index) => <div className="system-node-wrap" key={name}><button className={`system-node ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} aria-pressed={active === index}><span className="system-node-icon"><Icon size={18} strokeWidth={1.3} /></span><span className="system-node-name">{name}<small className="eyebrow">{stack}</small></span><span className="system-node-number">0{index + 1}</span></button>{index < systems.length - 1 && <div className="system-connector"><ArrowDown size={11} /><span /></div>}</div>)}</div><div className="system-caption" aria-live="polite"><span className="status-dot" /><p>{current.detail}</p></div></Reveal>
  </section>
}
