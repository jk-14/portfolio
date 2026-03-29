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

                  <div className="glass rounded-xl p-6">
                    <div className={`flex flex-col gap-1 mb-3 ${i % 2 === 0 ? 'md:items-end' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2 justify-between">
                        <span className="font-display font-bold text-text-primary">
                          {entry.company}
                        </span>
                        {entry.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-accent font-medium text-sm">{entry.role}</p>
                      <p className="text-text-muted text-xs">{entry.dateRange}</p>
                    </div>

                    <ul className={`space-y-1.5 text-text-muted text-sm leading-relaxed ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {entry.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-2">
                          <span className="text-accent/60 shrink-0 mt-0.5" aria-hidden="true">
                            ▸
                          </span>
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
