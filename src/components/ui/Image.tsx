import { useState } from 'react'

export function Image({ src, alt, className = '', eager = false, fallbackSrc = '/images/project-fallback.svg' }: { src: string; alt: string; className?: string; eager?: boolean; fallbackSrc?: string }) {
  const [failed, setFailed] = useState(false)
  return <img className={className} src={failed ? fallbackSrc : src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => { if (!failed) setFailed(true) }} />
}
