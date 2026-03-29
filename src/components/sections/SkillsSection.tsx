import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
// @ts-expect-error — JS React Bits component, no type declarations
import TiltedCard from '@/components/ui/TiltedCard'
import { skillCategories } from '@/data/skills'

// 1×1 transparent GIF — used as a blank canvas behind the overlay content
const TRANSPARENT_GIF =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-text-primary hover:border-accent/40 hover:text-accent transition-colors whitespace-nowrap">
      {skill}
    </span>
  )
}

const CARD_HEIGHT = '220px'

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-6 bg-background"
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
              <TiltedCard
                imageSrc={TRANSPARENT_GIF}
                altText=""
                containerHeight={CARD_HEIGHT}
                containerWidth="100%"
                imageHeight={CARD_HEIGHT}
                imageWidth="100%"
                scaleOnHover={1.03}
                rotateAmplitude={8}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div
                    style={{ width: '100%', height: CARD_HEIGHT }}
                    className="bg-background-alt rounded-xl p-6 overflow-hidden border border-accent/20 shadow-[0_0_18px_rgba(72,142,212,0.12),0_4px_24px_rgba(0,0,0,0.5)]"
                  >
                    <h3 className="font-display font-semibold text-accent text-sm uppercase tracking-wider mb-4">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill) => (
                        <SkillTag key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                }
              />
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
