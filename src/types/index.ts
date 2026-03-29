export interface NavLink {
  label: string
  href: string
}

export interface ExperienceEntry {
  company: string
  role: string
  dateRange: string
  current?: boolean
  bullets: string[]
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  techTags: string[]
  githubUrl: string
  liveUrl: string
}

export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin'
}
