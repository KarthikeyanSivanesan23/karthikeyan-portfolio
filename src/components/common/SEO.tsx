import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SEO({ title, description, image = '/og-image.svg' }: { title: string; description: string; image?: string }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = `${title} — Karthikeyan S`
    const origin = import.meta.env.VITE_SITE_URL || window.location.origin
    const url = new URL(pathname, origin).href
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        document.head.append(element)
      }
      element.content = value
    }
    meta('description', description)
    meta('og:title', document.title, true)
    meta('og:description', description, true)
    meta('og:url', url, true)
    meta('og:image', new URL(image, origin).href, true)
    meta('twitter:card', 'summary_large_image')
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = url
  }, [title, description, image, pathname])
  return null
}
