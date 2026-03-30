import { useState, useEffect } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const activeSection = useActiveSection()
  const scrollDir = useScrollDirection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHome, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.75)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHidden = pastHome && scrollDir === 'down' && !menuOpen

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-6 transition-transform duration-300 ${isHidden ? '-translate-y-[120%]' : 'translate-y-0'}`}
    >
      <nav
        className="glass border border-accent/40 rounded-full px-6 lg:px-10 w-full max-w-3xl shadow-[0_0_24px_rgba(72,142,212,0.25),0_8px_32px_rgba(0,0,0,0.6)]"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-[56px]">
          {/* Logo */}
          <a
            href="#home"
            className="font-display text-lg font-semibold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            aria-label="Jatin Kapil — back to top"
          >
            JK
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`text-base font-semibold inline-block transition-all duration-200 ease-out hover:scale-110 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 ${isActive ? 'text-accent scale-110' : 'text-text-muted'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-5 bg-text-primary transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-text-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-text-primary transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}
          style={{ borderRadius: menuOpen ? '0 0 1.5rem 1.5rem' : undefined }}
        >
          <ul className="flex flex-col gap-4 px-2" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 ${isActive ? 'text-accent font-semibold' : 'text-text-muted hover:text-text-primary'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}
