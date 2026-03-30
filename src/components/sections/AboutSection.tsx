import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
// @ts-expect-error — JS React Bits component, no type declarations
import SpotlightCard from '@/components/ui/SpotlightCard'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 px-6 bg-background-alt">
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
            <div className="space-y-5 text-text-muted text-lg leading-loose">
              <p>
                I am a driven Senior Developer with 10 years of experience building resilient
                digital tools for{' '}
                <strong className="text-text-primary font-semibold">FinTech and SaaS</strong>. While
                my core expertise lies in{' '}
                <strong className="text-text-primary font-semibold">
                  React, Node.js, Next.js and Vue.js
                </strong>
                , my current focus is at the intersection of web architecture and Artificial
                Intelligence.
              </p>
              <p>
                From integrating multi-system enterprise platforms to{' '}
                <strong className="text-text-primary font-semibold">
                  deploying AI agents and integrating MCP servers
                </strong>
                , I specialize in creating intelligent, automated systems that solve real-world
                problems. I build with a focus on scalability, user-centric design, and the
                technical precision required for enterprise-scale impact.
              </p>
            </div>
          </FadeContent>

          {/* Stat cards */}
          <FadeContent delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SpotlightCard
                className="text-center flex flex-col items-center gap-2"
                spotlightColor="rgba(0, 212, 255, 0.15)"
              >
                <span className="font-display text-4xl font-bold text-accent">10+</span>
                <span className="text-text-muted text-sm">Years Experience</span>
              </SpotlightCard>

              <SpotlightCard
                className="text-center flex flex-col items-center gap-2"
                spotlightColor="rgba(0, 212, 255, 0.15)"
              >
                <span className="font-display text-4xl font-bold text-accent">4</span>
                <span className="text-text-muted text-sm">Companies</span>
              </SpotlightCard>

              <SpotlightCard
                className="text-center flex flex-col items-center gap-2"
                spotlightColor="rgba(0, 212, 255, 0.15)"
              >
                <span className="font-display text-4xl font-bold text-accent">15+</span>
                <span className="text-text-muted text-sm">Technologies</span>
              </SpotlightCard>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
