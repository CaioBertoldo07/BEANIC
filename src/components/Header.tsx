import { useEffect, useState } from 'react'
import beanicLogo from '../assets/beanic-logo.png'
import './Header.css'

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#processo', label: 'Processo' },
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
          <span className="brand-sub">Soluções industriais</span>
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
          <a href="#contato" className="btn btn-ghost" style={{ padding: '10px 18px', fontSize: '13px' }}>
            Falar agora
            <span className="btn-arrow" />
          </a>
        </div>
      </div>
    </header>
  )
}
