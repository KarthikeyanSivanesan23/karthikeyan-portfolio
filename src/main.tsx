import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/manrope'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import './styles/portfolio.css'
import App from './App'
import { ErrorBoundary } from './components/common/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><ErrorBoundary><BrowserRouter><App /></BrowserRouter></ErrorBoundary></React.StrictMode>,
)
