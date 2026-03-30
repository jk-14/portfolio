import { lazy, Suspense, useEffect, useState } from 'react'

const Plasma = lazy(() => import('@/components/ui/Plasma'))

export function HomeSection() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background select-none"
    >
      {/* Plasma background — lazy loaded */}
      <div className="absolute inset-0 bg-background">
        <Suspense fallback={null}>
          <Plasma
            color="#488ed4"
            speed={0.6}
            direction="forward"
            scale={1.3}
            opacity={0.4}
            mouseInteractive={false}
          />
        </Suspense>
      </div>

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          id="home-heading"
          className="font-display font-bold leading-tight text-text-primary mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Jatin Kapil
        </h1>

        <p className="font-display font-medium italic text-xl sm:text-2xl text-accent mb-4">
          Senior Software Engineer
        </p>

        <p
          className="text-text-muted text-base sm:text-lg max-w-xl mx-auto mb-10"
          style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}
        >
          A dedicated Software Engineer with expertise in turning complex technical challenges into
          elegant, scalable web solutions.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="#contact"
            className="btn-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>Contact Me</span>
            <span className="icon-wrap" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Bottom fade — blends into About section background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0F0F18)' }}
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <a
        href="#about"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Scroll to About section"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          className="animate-bounce"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3v10M3 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
