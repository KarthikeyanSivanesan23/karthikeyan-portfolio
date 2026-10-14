import { useState } from 'react'

export function Image({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return <img className={className} src={failed ? '/images/project-fallback.svg' : src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => { if (!failed) setFailed(true) }} />
}
