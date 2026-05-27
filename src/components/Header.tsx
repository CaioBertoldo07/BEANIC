import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import './Header.css'

const navLinks = [
  { href: '#pilares', label: 'Pilares' },
  { href: '#publico', label: 'Para quem' },
  { href: '#problemas', label: 'Problemas' },
  { href: '#processo', label: 'Processo' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 200
      const sections = navLinks
        .map(l => document.querySelector(l.href))
        .filter(Boolean) as Element[]

      let activeIdx = 0
      sections.forEach((s, idx) => {
        if ((s as HTMLElement).offsetTop <= y) activeIdx = idx
      })
      setActiveSection(navLinks[activeIdx]?.href ?? '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <div className="container nav">
        <a href="#top" className="brand">
          <img src={beanicLogo} alt="BEANIC" />
        </a>

        <nav className="main">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Área Usuário
          </Link>
          <a href="#contato" className="btn btn-primary btn-sm">
            Solicitar diagnóstico
            <span className="btn-arrow" />
          </a>
        </div>
      </div>
    </header>
  )
}
