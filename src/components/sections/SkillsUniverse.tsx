import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const categories = {
  FRONTEND: ['React', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind'],
  BACKEND: ['Django', 'Python', 'Node.js', 'Express'],
  DATABASE: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB'],
  AI: ['LLM APIs', 'RAG', 'AI Agents', 'Prompt Engineering'],
  TOOLS: ['Git', 'GitHub', 'Vite', 'REST API', 'Cloudinary', 'Vercel'],
}
const notes = { FRONTEND: 'Interfaces with intention. Interaction with feeling.', BACKEND: 'Reliable foundations for ambitious ideas.', DATABASE: 'Well-structured data. Stronger applications.', AI: 'Intelligence that solves a real problem.', TOOLS: 'From a good idea to a dependable delivery.' }
type CategoryName = keyof typeof categories

export function SkillsUniverse() {
  const [category, setCategory] = useState<CategoryName>('FRONTEND')
  const [selected, setSelected] = useState('React')
  const stage = useRef<HTMLDivElement>(null)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const nodes = categories[category]
  return <section id="skills" className="section skills-section"><div className="container"><Reveal><SectionHeading label="THE TOOLKIT / ALWAYS EVOLVING" aside={<p>Different technologies.<br />One connected way of thinking.</p>}>A UNIVERSE<br />OF <em>POSSIBILITIES.</em></SectionHeading></Reveal>
    <div className="skills-layout"><div className="skill-categories" role="tablist" aria-label="Technology categories" aria-orientation="vertical">{(Object.keys(categories) as CategoryName[]).map((name, i) => <button key={name} id={`skill-tab-${name}`} role="tab" aria-selected={category === name} aria-controls="skill-panel" tabIndex={category === name ? 0 : -1} onClick={() => { setCategory(name); setSelected(categories[name][0]) }} onKeyDown={event => {
      const keys = Object.keys(categories) as CategoryName[]
      let next = i
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % keys.length
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i - 1 + keys.length) % keys.length
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = keys.length - 1
      else return
      event.preventDefault(); setCategory(keys[next]); setSelected(categories[keys[next]][0]); document.getElementById(`skill-tab-${keys[next]}`)?.focus()
    }}><span className="eyebrow">0{i + 1}</span>{name}<ArrowUpRight size={16} /></button>)}</div>
      <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${category}`} className="skill-panel"><div className="skill-space" ref={stage} onPointerMove={event => { if (!reduced && event.pointerType === 'mouse' && stage.current) { const rect = stage.current.getBoundingClientRect(); stage.current.style.setProperty('--pointer-x', `${(event.clientX - rect.left - rect.width / 2) / 50}deg`); stage.current.style.setProperty('--pointer-y', `${-(event.clientY - rect.top - rect.height / 2) / 50}deg`) } }} onPointerLeave={() => { stage.current?.style.setProperty('--pointer-x', '0deg'); stage.current?.style.setProperty('--pointer-y', '0deg') }}>
        <div className="universe-orbit orbit-one" /><div className="universe-orbit orbit-two" /><div className="universe-orbit orbit-three" /><div className="universe-hub" aria-hidden="true">KS<span>CONNECTED STACK</span></div>
        <svg className="universe-connections" viewBox="0 0 700 420" aria-hidden="true">{nodes.map((name, i) => { const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2; return <line key={name} className={selected === name ? 'selected' : ''} x1="350" y1="210" x2={350 + Math.cos(angle) * 235} y2={210 + Math.sin(angle) * 152} /> })}</svg>
        {nodes.map((name, i) => { const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2; return <button key={name} className={`tech-node ${selected === name ? 'selected' : ''}`} style={{ left: `${50 + Math.cos(angle) * 33.6}%`, top: `${50 + Math.sin(angle) * 36.2}%`, animationDelay: `${i * -.7}s` }} onMouseEnter={() => setSelected(name)} onFocus={() => setSelected(name)} onClick={() => setSelected(name)} aria-pressed={selected === name}><span className="tech-node-symbol">{name === 'React' ? '⚛' : name === 'HTML' ? '</>' : name.slice(0, 2)}</span><span>{name}</span></button> })}
      </div><div className="skills-footnote"><span className="eyebrow">{category} / {nodes.length} TECHNOLOGIES</span><p>{notes[category]}</p></div></div>
    </div></div></section>
}
