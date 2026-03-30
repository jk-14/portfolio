import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-6 bg-background-alt"
    >
      <div className="mx-auto max-w-4xl">
        <FadeContent>
          <h2
            id="experience-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="Experience" tag="span" />
          </h2>
        </FadeContent>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((entry, i) => (
              <FadeContent key={`${entry.company}-${i}`} delay={i * 100}>
                <div
                  className={`relative pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-background left-[9px] md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  />

                  <div className="relative bg-background-alt rounded-xl p-6 border border-accent/20 shadow-[0_0_18px_rgba(72,142,212,0.10),0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200 hover:shadow-[0_0_28px_rgba(72,142,212,0.22),0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden group">
                    {/* Left accent stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent/80 via-accent/40 to-transparent rounded-l-xl" aria-hidden="true" />
                    <div className={`flex flex-col gap-1 mb-3 ${i % 2 === 0 ? 'md:items-end' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2 justify-between">
                        <span className="font-display font-bold text-text-primary">
                          {entry.company}
                        </span>
                      </div>
                      <p className="text-accent font-medium text-sm">{entry.role}</p>
                      <p className="text-text-muted text-xs">{entry.dateRange}</p>
                    </div>

                    <ul className="text-text-muted text-sm leading-relaxed text-left">
                      {entry.bullets.map((bullet, bi) => (
                        <li key={bi}>
                          {bi !== 0 && <div className="h-px bg-accent/25 my-2.5" aria-hidden="true" />}
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
