// @ts-expect-error — JS React Bits component, no type declarations
import SpotlightCard from '@/components/ui/SpotlightCard'
import { GithubIcon } from '@/components/ui/Icons'
import type { Project } from '@/types'

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="h-full" spotlightColor="rgba(0, 212, 255, 0.15)">
      <div className="flex flex-col h-full gap-4">
        <h3 className="font-display font-bold text-text-primary text-lg">{project.title}</h3>
        <p className="text-text-muted text-sm leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 py-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className="flex items-center gap-2 text-text-muted text-sm hover:text-accent underline-offset-4 hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <GithubIcon size={18} />
            View Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex items-center gap-2 text-text-muted text-sm hover:text-accent underline-offset-4 hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <ExternalLinkIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}
