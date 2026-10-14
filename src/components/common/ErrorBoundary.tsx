import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Experience boundary:', error, info.componentStack) }
  render() {
    if (this.state.failed) return this.props.fallback || <div className="page-error container"><span className="eyebrow">SIGNAL INTERRUPTED</span><h1>Let’s reconnect.</h1><p>The experience hit an unexpected error.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload experience ↗</button></div>
    return this.props.children
  }
}
