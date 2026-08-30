export const profile = {
  name: 'Pritom Sunny Purkayasta',
  title: 'Software Engineer',
  tagline: 'I build fast, thoughtful software for the web.',
}

export type Experience = {
  company: string
  role: string
  period: string
  description: string
}

export const experience: Experience[] = [
  {
    company: 'Cefalo',
    role: 'Senior Software Engineer',
    period: '2023 — Present',
    description:
      'Leading development of client-facing web platforms, mentoring engineers, and driving architecture decisions across frontend and backend teams.',
  },
  {
    company: 'Brain Station 23',
    role: 'Software Engineer',
    period: '2021 — 2023',
    description:
      'Built and shipped full-stack features for enterprise products, focusing on performance and reliability at scale.',
  },
  {
    company: 'Techno Next',
    role: 'Junior Developer',
    period: '2019 — 2021',
    description:
      'Started my career building internal tools and learning the fundamentals of production software engineering.',
  },
  {
    company: 'University',
    role: 'B.Sc. in Computer Science',
    period: '2015 — 2019',
    description:
      'Studied computer science with a focus on software systems, algorithms, and human-computer interaction.',
  },
]

export type Project = {
  title: string
  description: string
  tech: string[]
  link: string
}

export const projects: Project[] = [
  {
    title: 'Aurora',
    description: 'A real-time collaboration tool for distributed teams.',
    tech: ['React', 'TypeScript', 'WebSockets'],
    link: '#',
  },
  {
    title: 'Skyline',
    description: 'An analytics dashboard for tracking product metrics.',
    tech: ['Next.js', 'D3.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Nimbus',
    description: 'A lightweight CMS built for speed and simplicity.',
    tech: ['Node.js', 'Redis', 'Tailwind'],
    link: '#',
  },
]

export const skills: string[] = [
  'TypeScript',
  'React',
  'Node.js',
  'Java',
  'PostgreSQL',
  'Redis',
  'AWS',
  'Docker',
  'GraphQL',
  'CI/CD',
]

export const contact = {
  email: 'hello@example.com',
  github: 'https://github.com/purkayasta',
  linkedin: 'https://linkedin.com/in/purkayasta',
}
