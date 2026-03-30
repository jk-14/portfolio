import type { Project } from '@/types'

export const projects: Project[] = [
  {
    title: 'UiGen',
    description: 'AI-powered React component generator with real-time preview and a code view.',
    techTags: [
      'Next.js 15',
      'React 19',
      'Tailwind',
      'Prisma with SQLite',
      'Anthropic Claude AI',
      'Vercel AI SDK',
    ],

    githubUrl: 'https://github.com/jk-14/uigen',
    liveUrl: '',
  },
  {
    title: 'Elevate',
    description: 'A full stack application that gives users insights into the best tech events.',
    techTags: [
      'React.js',
      'Node.js (Express)',
      'PostgreSQL',
      'OAuth',
      'JWT',],
    githubUrl: 'https://github.com/jk-14/elevate',
    liveUrl: '',
  },
]
