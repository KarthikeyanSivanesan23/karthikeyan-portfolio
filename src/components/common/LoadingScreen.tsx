export function LoadingScreen({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'content-loading' : 'loading-screen'} role="status" aria-live="polite">
    {!compact && <strong className="loading-logo">KS<span>.</span></strong>}
    <span className="eyebrow">{compact ? 'LOADING THE NEXT DIMENSION' : 'INITIALIZING PORTFOLIO'}</span>
    <div className="loading-track"><span /></div>
    <span className="sr-only">Loading, please wait</span>
  </div>
}
