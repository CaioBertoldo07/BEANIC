import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import beanicLogo from '../assets/beanic-logo.png'
import './Header.css'

const navLinks = [
  { href: '#problemas', label: 'Problemas' },
  { href: '#pilares', label: 'Pilares' },
  { href: '#processo', label: 'Processo' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

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

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', menuOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header>
      <div className="container nav">
        <a href="#top" className="brand" onClick={closeMenu}>
          <img src={beanicLogo} alt="BEANIC" />
        </a>

        <button
          className={`mobile-nav-toggle${menuOpen ? ' open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={`main${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'active' : ''}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Área Usuário
          </Link>
          <a href="#contato" className="btn btn-primary btn-sm" onClick={closeMenu}>
            Solicitar diagnóstico
            <span className="btn-arrow" />
          </a>
        </div>
      </div>
    </header>
  )
}
