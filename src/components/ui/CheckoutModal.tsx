import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BookOpen, CheckCircle2, Database, Download, FileText, Loader2, Lock, X } from 'lucide-react'
import type { Project } from '../../types/content'

type Stage = 'idle' | 'processing' | 'success'

const inclusions = [
  { icon: FileText, label: 'Full source code' },
  { icon: BookOpen, label: 'Documentation & README' },
  { icon: Database, label: 'Database schema & seed data' },
]

export function CheckoutModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('idle')
  const timer = useRef<number | null>(null)

  const price = project.source_price ? Number(project.source_price) : 0
  const filename = project.download_url.split('/').pop() || 'source-code.zip'

  useEffect(() => {
    document.body.classList.add('menu-open')
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', onKey); if (timer.current) window.clearTimeout(timer.current) }
  }, [onClose])

  const startDownload = () => {
    if (!project.download_url) return
    const link = document.createElement('a')
    link.href = project.download_url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const pay = () => {
    setStage('processing')
    timer.current = window.setTimeout(() => { setStage('success'); startDownload() }, 1800)
  }

  return createPortal(
    <div className="checkout-overlay" role="dialog" aria-modal="true" aria-label="Buy source code and documentation" onClick={event => { if (event.target === event.currentTarget && stage !== 'processing') onClose() }}>
      <div className="checkout-modal">
        <button className="checkout-close" aria-label="Close checkout" onClick={onClose} disabled={stage === 'processing'}><X size={16} /></button>
        {stage === 'success' ? (
          <div className="checkout-success">
            <CheckCircle2 size={46} strokeWidth={1.2} />
            <p className="eyebrow">Payment successful</p>
            <h3>You own it now.</h3>
            <p>Your download of <strong>{filename}</strong> has started. Keep the zip somewhere safe — it contains the full source code and documentation for {project.title}.</p>
            <button className="button button-secondary checkout-download-again" onClick={startDownload}><Download size={14} /> Download again</button>
          </div>
        ) : (
          <>
            <div className="checkout-head">
              <span className="eyebrow">Source code + documentation</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <ul className="checkout-includes">
              {inclusions.map(item => { const Icon = item.icon; return <li key={item.label}><Icon size={14} strokeWidth={1.6} />{item.label}</li> })}
            </ul>
            <div className="checkout-total">
              <span className="eyebrow">One-time payment</span>
              <strong>₹{price}<small> / SOURCE + DOCS</small></strong>
            </div>
            <button className="button button-primary checkout-pay" onClick={pay} disabled={stage === 'processing'}>
              {stage === 'processing' ? <><Loader2 className="spin" size={15} /> Processing payment…</> : <><Lock size={14} /> Pay ₹{price}</>}
            </button>
            <p className="checkout-note eyebrow">Demo checkout — simulated payment, no real charge. Zip downloads on success.</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}