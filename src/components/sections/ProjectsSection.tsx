import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <FadeContent>
          <h2
            id="projects-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="Projects" tag="span" />
          </h2>
        </FadeContent>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, i) => (
            <FadeContent
              key={project.title}
              delay={i * 100}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} />
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
