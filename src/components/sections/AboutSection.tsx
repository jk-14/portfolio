import { useEffect, useRef, useState } from 'react'
import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
// @ts-expect-error — JS React Bits component, no type declarations
import SpotlightCard from '@/components/ui/SpotlightCard'

interface StatCardProps {
  value: number
  label: string
  suffix?: string
}

function StatCard({ value, label, suffix = '+' }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1500
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <SpotlightCard
      className="text-center flex flex-col items-center gap-2"
      spotlightColor="rgba(0, 212, 255, 0.15)"
    >
      <div ref={ref}>
        <span className="font-display text-4xl font-bold text-accent">
          {count}{suffix}
        </span>
      </div>
      <span className="text-text-muted text-sm">{label}</span>
    </SpotlightCard>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 px-6 bg-background-alt"
    >
      <div className="mx-auto max-w-7xl">
        <FadeContent>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="About Me" tag="span" />
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Bio */}
          <FadeContent delay={100}>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                [PLACEHOLDER — short bio paragraph from .docx. Should highlight experience,
                expertise in React/TypeScript, and passion for building scalable systems.]
              </p>
              <p>
                [PLACEHOLDER — second paragraph about approach, values, or notable achievements.]
              </p>
              <p className="text-accent font-medium mt-6">
                Currently open to Senior Full Stack / Frontend roles in Toronto.
              </p>
            </div>
          </FadeContent>

          {/* Stat cards */}
          <FadeContent delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard value={8} label="Years Experience" suffix="+" />
              <StatCard value={4} label="Companies" suffix="" />
              <StatCard value={15} label="Technologies" suffix="+" />
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
