import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const services = [
  ['FULL STACK DEVELOPMENT', 'From the first wireframe to the last API endpoint. Thoughtful, responsive web applications built around your business.', 'REACT / DJANGO / NODE.JS'],
  ['AI APPLICATIONS', 'Useful intelligence, thoughtfully integrated. Custom assistants, retrieval-augmented workflows and AI-powered products.', 'LLM APIS / RAG / AI AGENTS'],
  ['3D WEB EXPERIENCES', 'Add a new dimension to your story. Interactive product experiences and immersive websites with performance built in.', 'THREE.JS / WEBGL / CREATIVE DEVELOPMENT'],
  ['E-COMMERCE', 'A considered path from discovery to purchase. Custom storefronts, catalogue systems and configured payment integrations.', 'STOREFRONTS / CATALOGUES / CHECKOUT'],
  ['API DEVELOPMENT', 'The connections that keep everything moving. Documented, maintainable APIs with thoughtful data models and authentication.', 'REST / INTEGRATIONS / DATA MODELLING'],
  ['PROJECT CUSTOMIZATION', 'Make the right starting point your own. Extend an existing product, refine its experience or build a new capability.', 'FEATURES / UI / ARCHITECTURE'],
  ['DEPLOYMENT', 'Take your application into the real world. Environment configuration, release workflows and practical deployment support.', 'HOSTING / CI / PRODUCTION SETUP'],
]

export function Services() {
  const [expanded, setExpanded] = useState<number | null>(0)
  return <section id="services" className="section services-section container"><Reveal><SectionHeading label="CAPABILITIES / FROM IDEA TO IMPACT" aside={<p>One developer.<br />The whole picture.</p>}>GOOD IDEAS DESERVE<br /><em>GREAT EXECUTION.</em></SectionHeading></Reveal><div className="services-list">{services.map(([name, description, stack], i) => <div className={`service-row ${expanded === i ? 'expanded' : ''}`} key={name}><button aria-expanded={expanded === i} aria-controls={`service-${i}`} onClick={() => setExpanded(expanded === i ? null : i)}><span className="eyebrow service-index">0{i + 1}</span><span className="service-name">{name}</span><span className="service-indicator">{expanded === i ? <ArrowDownRight /> : <ArrowUpRight />}</span></button><div className="service-content" id={`service-${i}`} hidden={expanded !== i}><p>{description}</p><div><span className="eyebrow">{stack}</span><a href="/#contact" className="text-link">Discuss a project <ArrowUpRight /></a></div></div></div>)}</div></section>
}
