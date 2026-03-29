import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'MUFG Investor Services',
    role: 'Senior Software Engineer',
    dateRange: 'July 2023 – Present',
    current: true,
    bullets: [
      'Built and maintained enterprise-wide digital tools on a high-traffic financial services platform, shipping new features across five product workstreams.',
      'Developed AI agents and MCP server integrations using Claude Code to automate development workflows — including boilerplate scaffolding, unit test generation, and architectural enforcement — achieving a 50% increase in feature delivery velocity.',
      'Designed and owned a centralized Storybook Design System used across four product families, ensuring cross-browser compatibility and UI consistency — reducing frontend development time by 30%.',
      'Architected a scalable Microfrontend platform enabling independent deployment cycles, reducing cross-team dependencies by ~40%.',
      'Led Node.js multi-system API performance optimization, improving end-to-end response times by 40%.',
      'Partnered with DevOps to design and maintain GitLab CI/CD pipelines with automated linting and unit testing.',
    ],
  },
  {
    company: 'Maropost',
    role: 'Technology Lead',
    dateRange: 'May 2020 – May 2023',
    bullets: [
      'Owned end-to-end feature delivery on a SaaS platform — translating business requirements into technical solutions and integrating third-party services including authentication providers and analytics tools.',
      'Implemented secure OAuth and JWT authentication patterns and ensured secure data handling across all API integrations.',
      'Built responsive React.js interfaces with third-party integrations (rich editors, data visualization, maps), ensuring cross-browser compatibility.',
      'Implemented Redis distributed caching and optimized SQL queries to reduce end-to-end API latency by 30%, improving platform scalability under peak load.',
      'Mentored junior and mid-level engineers, conducted code reviews, and managed version control across sandbox and production environments.',
    ],
  },
  {
    company: 'Jungleworks',
    role: 'Technical Lead',
    dateRange: 'June 2017 – April 2020',
    bullets: [
      'Migrated a monolithic application to a Node.js Microservices architecture on AWS, dramatically improving scalability and deployment independence.',
      'Led Angular-to-React migration, improving frontend performance and developer velocity.',
      'Implemented strategic Redis caching to improve API response times by 40%.',
    ],
  },
  {
    company: 'Infosys Ltd.',
    role: 'Systems Engineer',
    dateRange: 'June 2015 – June 2017',
    bullets: [
      'Developed client-side web applications using AngularJS for Morgan Stanley Wealth Management.',
      'Implemented Java persistence layers using Hibernate ORM and MySQL.',
    ],
  },
]
