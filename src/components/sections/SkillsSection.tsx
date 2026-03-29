import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
import { skillCategories } from '@/data/skills'

function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm font-normal bg-white/10 border border-white/20 text-text-primary hover:border-accent/40 hover:text-accent transition-colors whitespace-nowrap">
      {skill}
    </span>
  )
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-6 bg-background select-none cursor-default"
    >
      <div className="mx-auto max-w-7xl">
        <FadeContent>
          <h2
            id="skills-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="Skills & Technologies" tag="span" />
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {skillCategories.map((category, i) => (
            <FadeContent key={category.name} delay={i * 80} className="w-full">
              <div className="bg-background-alt rounded-xl p-6 border border-accent/20 shadow-[0_0_18px_rgba(72,142,212,0.12),0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-200 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(72,142,212,0.22),0_8px_32px_rgba(0,0,0,0.6)]">
                <h3 className="font-display font-semibold text-accent text-sm uppercase tracking-wider mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
