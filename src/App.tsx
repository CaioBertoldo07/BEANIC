import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MarketingPage from './pages/MarketingPage'
import RegistrarPage from './pages/RegistrarPage'
import ClienteLayout from './pages/cliente/ClienteLayout'
import ClienteDashboard from './pages/cliente/ClienteDashboard'
import ClienteDownloads from './pages/cliente/ClienteDownloads'
import ClienteDocs from './pages/cliente/ClienteDocs'
import ClienteConta from './pages/cliente/ClienteConta'
import AdminLayout from './pages/admin/AdminLayout'
import AdminCadastrosPage from './pages/admin/AdminCadastrosPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/registrar" element={<RegistrarPage />} />
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route index element={<ClienteDashboard />} />
          <Route path="downloads" element={<ClienteDownloads />} />
          <Route path="docs" element={<ClienteDocs />} />
          <Route path="conta" element={<ClienteConta />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminCadastrosPage />} />
          <Route path="cadastros" element={<AdminCadastrosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
