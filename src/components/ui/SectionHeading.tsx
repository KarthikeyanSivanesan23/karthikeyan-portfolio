import type { ReactNode } from 'react'

export function SectionHeading({ label, children, aside }: { label: string; children: ReactNode; aside?: ReactNode }) {
  return <div className="section-heading">
    <div><p className="eyebrow section-label"><span />{label}</p><h2>{children}</h2></div>
    {aside && <div className="section-aside">{aside}</div>}
  </div>
}
