import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend & Databases',
    skills: [
      'Node.js (Express)',
      'GraphQL',
      'REST APIs',
      'OAuth',
      'JWT',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'Microservices',
      'Python',
    ],
  },
  {
    name: 'Frontend',
    skills: [
      'React.js',
      'TypeScript',
      'JavaScript (ES2022+)',
      'Next.js',
      'Vue.js',
      'Redux',
      'SASS/CSS',
      'Storybook',
      'Microfrontend Architecture',
    ],
  },
  {
    name: 'AI & Agents',
    skills: ['Claude Code', 'MCP Servers', 'AI Agentic Workflows', 'Cursor', 'SDLC Automation'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'GitLab CI/CD', 'GitHub'],
  }
]
