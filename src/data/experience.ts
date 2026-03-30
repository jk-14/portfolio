import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'MUFG Investor Services',
    role: 'Senior Software Engineer',
    dateRange: 'July 2023 – March 2026',
    current: true,
    bullets: [
      'Shipped features across 5 product workstreams on a high-traffic financial platform.',
      'Built AI agents & MCP integrations with Claude Code — boosted delivery velocity by 50%.',
      'Owned a Storybook Design System across 4 product families — cut frontend dev time by 30%.',
      'Architected a Microfrontend platform — reduced cross-team dependencies by ~40%.',
      'Optimized Node.js multi-system APIs — improved response times by 40%.',
      'Designed and maintained GitLab CI/CD pipelines with automated linting and testing.',
    ],
  },
  {
    company: 'Maropost',
    role: 'Technology Lead',
    dateRange: 'May 2020 – May 2023',
    bullets: [
      'Owned end-to-end feature delivery on a SaaS platform, integrating auth providers and analytics tools.',
      'Implemented secure OAuth & JWT authentication across all API integrations.',
      'Built responsive React.js interfaces with rich editors, data visualization, and maps.',
      'Reduced API latency by 30% via Redis caching and SQL query optimization.',
      'Mentored engineers, led code reviews, and managed version control across environments.',
    ],
  },
  {
    company: 'Jungleworks',
    role: 'Technical Lead',
    dateRange: 'June 2017 – April 2020',
    bullets: [
      'Migrated a monolith to Node.js Microservices on AWS — improved scalability and deployment independence.',
      'Led Angular-to-React migration — boosted frontend performance and developer velocity.',
      'Implemented Redis caching — improved API response times by 40%.',
    ],
  },
  {
    company: 'Infosys Ltd.',
    role: 'Systems Engineer',
    dateRange: 'June 2015 – June 2017',
    bullets: [
      'Built AngularJS client-side applications for Morgan Stanley Wealth Management.',
      'Implemented Java persistence layers using Hibernate ORM and MySQL.',
    ],
  },
]
