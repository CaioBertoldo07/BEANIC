import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Trust from '../components/Trust'
import Services from '../components/Services'
import Audiences from '../components/Audiences'
import Problems from '../components/Problems'
import Process from '../components/Process'
import Differentials from '../components/Differentials'
import Portfolio from '../components/Portfolio'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function MarketingPage() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id.length <= 1) return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        window.scrollTo({ top: (el as HTMLElement).offsetTop - 60, behavior: 'smooth' })
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <Trust />
      <Services />
      <Audiences />
      <Problems />
      <Process />
      <Differentials />
      <Portfolio />
      <FinalCTA />
      <Footer />
    </>
  )
}
