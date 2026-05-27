import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MarketingPage from './pages/MarketingPage'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const ClienteLayout = lazy(() => import('./pages/cliente/ClienteLayout'))
const ClienteDashboard = lazy(() => import('./pages/cliente/ClienteDashboard'))
const ClienteDownloads = lazy(() => import('./pages/cliente/ClienteDownloads'))
const ClienteDocs = lazy(() => import('./pages/cliente/ClienteDocs'))
const ClienteConta = lazy(() => import('./pages/cliente/ClienteConta'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminUsuariosPage = lazy(() => import('./pages/admin/AdminUsuariosPage'))

export default function App() {
  return (
    <BrowserRouter>
      <div className="amb" />
      <div className="dots-bg" />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cliente" element={<ClienteLayout />}>
            <Route index element={<ClienteDashboard />} />
            <Route path="downloads" element={<ClienteDownloads />} />
            <Route path="docs" element={<ClienteDocs />} />
            <Route path="conta" element={<ClienteConta />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminUsuariosPage />} />
            <Route path="usuarios" element={<AdminUsuariosPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
