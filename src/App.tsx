import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
const HomePage = lazy(() => import('./pages/HomePage'))

export default function App() {
  return <Routes><Route element={<RootLayout />}><Route index element={<HomePage />} /></Route></Routes>
}
