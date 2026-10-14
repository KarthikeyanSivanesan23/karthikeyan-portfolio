import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { sendInquiry } from '../../services/contact'
import { errorMessage } from '../../services/api'

export function Contact() {
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')
  const form = useRef<HTMLFormElement>(null)
  const location = useLocation()
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const product = query.get('product'), tier = query.get('tier')
    if (product && form.current) {
      const message = form.current.elements.namedItem('message') as HTMLTextAreaElement
      const type = form.current.elements.namedItem('project_type') as HTMLSelectElement
      message.value = `I’m interested in ${product}${tier ? ` (${tier} package)` : ''}. Please share availability and details.`
      type.value = 'source_code'
    }
  }, [location.search])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'loading') return
    const data = new FormData(event.currentTarget)
    setState('loading'); setError('')
    try {
      await sendInquiry({ name: String(data.get('name') || ''), email: String(data.get('email') || ''), project_type: String(data.get('project_type') || ''), budget: String(data.get('budget') || ''), message: String(data.get('message') || ''), website: String(data.get('website') || '') })
      setState('success'); form.current?.reset()
    } catch (err) { setError(errorMessage(err)); setState('error') }
  }
  return <section id="contact" className="section contact-section"><div className="container contact-layout"><Reveal className="contact-copy"><p className="eyebrow section-label"><span />04 / LET’S BUILD</p><h2>HAVE AN IDEA?<br />LET’S MAKE<br /><em>IT REAL.</em><ArrowUpRight className="contact-heading-arrow" strokeWidth={.8} /></h2><p>Ambitious project? Interesting problem?<br />Or just a good conversation about what’s possible.<br />I’d love to hear from you.</p><div className="contact-availability"><span className="status-dot" /><span>Open to select projects & collaborations</span></div>{contactEmail && <a href={`mailto:${contactEmail}`} className="text-link">{contactEmail} <ArrowUpRight /></a>}<div className="contact-coordinate eyebrow">BASED IN INDIA <span>WORKING EVERYWHERE ↗</span></div></Reveal>
    <Reveal className="contact-form-wrap" delay={.1}>{state === 'success' ? <div className="contact-success" role="status"><CheckCircle2 size={40} strokeWidth={1} /><span className="eyebrow">MESSAGE RECEIVED</span><h3>A good beginning.</h3><p>Your inquiry has been saved. Thank you for sharing your idea — let’s see where it can go.</p><button className="text-link" onClick={() => setState('idle')}>Send another message <ArrowUpRight /></button></div> : <form ref={form} onSubmit={submit} className="contact-form"><div className="form-row"><label htmlFor="contact-name">YOUR NAME<input id="contact-name" name="name" placeholder="What should I call you?" required minLength={2} maxLength={120} autoComplete="name" /></label><label htmlFor="contact-email">EMAIL ADDRESS<input id="contact-email" name="email" placeholder="you@yourcompany.com" type="email" required maxLength={254} autoComplete="email" /></label></div><div className="form-row"><label htmlFor="contact-type">WHAT ARE WE BUILDING?<select id="contact-type" name="project_type" required defaultValue=""><option value="" disabled>Select project type</option><option value="full_stack">Full stack application</option><option value="ai">AI application</option><option value="3d_web">3D web experience</option><option value="ecommerce">E-commerce</option><option value="api">API development</option><option value="source_code">Source code / customization</option><option value="deployment">Deployment</option><option value="other">Something else</option></select></label><label htmlFor="contact-budget">PROJECT BUDGET<select id="contact-budget" name="budget" required defaultValue=""><option value="" disabled>Select a range (INR)</option><option value="under_25k">Under ₹25,000</option><option value="25k_75k">₹25,000 – ₹75,000</option><option value="75k_150k">₹75,000 – ₹1,50,000</option><option value="150k_plus">₹1,50,000+</option><option value="discuss">Let’s discuss</option></select></label></div><label htmlFor="contact-message">TELL ME ABOUT YOUR IDEA<textarea id="contact-message" name="message" rows={5} required minLength={20} maxLength={5000} placeholder="The vision, the challenge, the little details…" /></label><div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field blank<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>{state === 'error' && <p className="form-error" role="alert">{error}</p>}<div className="form-footer"><p>Your details are used only<br />to respond to your inquiry.</p><button type="submit" className="button button-primary" disabled={state === 'loading'}>{state === 'loading' ? <>SENDING <LoaderCircle className="spin" /></> : <>SEND MESSAGE <ArrowRight /></>}</button></div></form>}</Reveal>
  </div></section>
}
