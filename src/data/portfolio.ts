function monthsBetween(from: string, to: string): number {
  const start = new Date(`1 ${from}`)
  const end = to === 'Present' ? new Date() : new Date(`1 ${to}`)
  return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1
}

export function duration(period: string): string {
  const [from, to] = period.split('–').map((p) => p.trim())
  const months = monthsBetween(from, to)
  const [y, m] = [Math.floor(months / 12), months % 12]
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' ')
}

export const profile = {
  name: 'Pritom Purkayasta',
  title: 'Gilfoyle does the infra. Dinesh writes the Java. I ship.',
  careerStart: 'Feb 2018',
  get years() {
    return Math.floor(monthsBetween(this.careerStart, 'Present') / 12)
  },
  get tagline() {
    return `${this.years} years shipping cloud-native .NET, Blazor and Azure systems — microservices, modernization, and agentic AI. Working from wherever the window seat is.`
  },
}

export type Role = {
  title: string
  period: string
  bullets: string[]
}

export type Experience = {
  company: string
  period: string
  link?: string
  roles: Role[]
}

export const experience: Experience[] = [
  {
    company: 'Cefalo Bangladesh Ltd.',
    period: 'Feb 2022 – Present',
    link: 'https://www.cefalo.com',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Feb 2022 – Jun 2023',
        bullets: [
          'Worked on a crypto client — built the exchange API and the serverless pieces behind it on Azure Functions, Service Bus and Redis. It ran about 25% faster than what it replaced.',
          'Designed the time-series side of it on Cosmos DB, which meant learning the hard way how much partition keys matter.',
          'Spent a good chunk of that year on slow queries and caching, and the load dropped noticeably.',
          'Sat with product managers to turn vague asks into specs, and kept the docs and release notes actually current.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        period: 'Jul 2023 – Jan 2026',
        bullets: [
          'Took on the NTB migrations: a Visual Basic / .NET Framework 2.0 codebase brought up to .NET 8, Adobe InDesign COM interop and all, running on current Windows Server.',
          'Migrated the internal HR portal to the current .NET version without the team losing a day to it — uptime stayed above 99%.',
          'Kept an eye on API Management and Application Insights, which is mostly the unglamorous work of noticing things before users do.',
          'Reviewed a lot of pull requests and wrote down the conventions we kept re-explaining.',
        ],
      },
      {
        title: 'Staff Software Engineer',
        period: 'Jan 2026 – Present',
        bullets: [
          'Adding an MCP server to the HR portal so people can just ask for their reports instead of filing a request and waiting.',
          'Building RAG over per-employee data, scoped per person, so answers stay grounded and nobody sees what they should not.',
          'Helped build Convene Customer Portal in Blazor on top of PostgreSQL — C#-first, clean layering, no JavaScript framework to babysit.',
          'GitHub Copilot and Claude Code are how I actually work now — agentic engineering as daily practice, not a demo. Also mentoring juniors and leading reviews.',
        ],
      },
    ],
  },
  {
    company: 'Insightin Technology Bangladesh Ltd. (formerly desme)',
    period: 'Aug 2019 – Jan 2022',
    link: 'https://www.linkedin.com/company/insightin-technology',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Aug 2019 – Jan 2022',
        bullets: [
          'Looked after the background services that moved data around — the kind of thing nobody notices until it stops.',
          'Helped move the platform off .NET Framework in eight months, risk analysis first. Server usage came down roughly 20% over the following year.',
          'Planned and coordinated work on a service-oriented monolith with the rest of the team.',
          'Cleaned up code smells as I went, and ran internal sessions when something was worth sharing.',
        ],
      },
    ],
  },
  {
    company: 'BDECOM IT Ltd',
    period: 'Feb 2018 – Jul 2019',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Feb 2018 – Jul 2019',
        bullets: [
          'Added features to an ERP system and kept the older programs running as requirements shifted under them.',
          'Worked on data-collection and budget modules for Bangladesh Bureau of Statistics systems.',
          'Wrote the reports, manuals and handover docs, and spent a week training BBS officials on how to use what we built.',
        ],
      },
    ],
  },
  {
    company: 'DataPath Ltd.',
    period: 'Jul 2017 – Nov 2017',
    roles: [
      {
        title: 'Software Engineer Intern',
        period: 'Jul 2017 – Nov 2017',
        bullets: [
          'First real codebase: wrote APIs for data-entry pages and wired them into the front end.',
          'Learned front-end, back-end and databases in one go, and what a standup is for.',
        ],
      },
    ],
  },
]

export type Education = {
  school: string
  degree: string
  period: string
}

export const education: Education[] = [
  {
    school: 'American International University – Bangladesh (AIUB)',
    degree: "Bachelor's Degree, Computer Science",
    period: 'May 2013 – Nov 2017',
  },
]

export type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  note?: string
}

export const projects: Project[] = [
  {
    title: 'Roaster',
    description:
      'AI code-review tool giving line-by-line feedback in a Monaco editor via an event-driven pipeline (RabbitMQ + local LLM).',
    tech: ['.NET', 'Blazor', 'Ollama', 'RabbitMQ'],
    link: 'https://github.com/purkayasta',
    note: 'private repo',
  },
  {
    title: 'Document-Rag',
    description: 'Fully local multi-turn document Q&A chat system with no external API dependency.',
    tech: ['.NET 10', 'Semantic Kernel', 'Ollama', 'React 19'],
    link: 'https://github.com/purkayasta',
    note: 'private repo',
  },
  {
    title: 'The UtilityVerse',
    description:
      'NuGet suite of dependency-free C# helpers, ASP.NET Core extensions, and a Roslyn source generator for auto-generated shallow/deep copy methods.',
    tech: ['C#', 'NuGet', 'Roslyn Source Generators'],
    link: 'https://github.com/purkayasta/TheUtilityVerse',
  },
  {
    title: 'ImgToPdf',
    description:
      'Browser-only image-to-PDF converter using a Web Worker for off-main-thread JPEG compression.',
    tech: ['Solid.js', 'TypeScript', 'Vite'],
    link: 'https://github.com/purkayasta/ImgToPdf',
  },
  {
    title: 'Json',
    description: 'Installable PWA for formatting, minifying, and diffing JSON documents.',
    tech: ['React', 'Tailwind CSS', 'PWA'],
    link: 'https://github.com/purkayasta/Json',
  },
]

export const skills: Array<{ genre: string; items: string[] }> = [
  {
    genre: 'Languages & Runtimes',
    items: ['C#', '.NET (Framework – .NET 10)', 'ASP.NET Core', 'TypeScript'],
  },
  {
    genre: 'Web & UI',
    items: ['Blazor (WASM & Server)', 'MudBlazor', 'React', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    genre: 'AI & Agents',
    items: ['Claude Code', 'GitHub Copilot', 'Semantic Kernel', 'RAG pipelines', 'Ollama', 'MCP'],
  },
  {
    genre: 'Cloud & Azure',
    items: [
      'Azure',
      'Azure Functions',
      'Azure Service Bus',
      'Azure API Management',
      'Azure Key Vault',
      'Application Insights',
    ],
  },
  {
    genre: 'Data & Storage',
    items: ['EF Core', 'Dapper', 'SQL Server', 'PostgreSQL', 'Cosmos DB', 'MongoDB', 'Redis'],
  },
  {
    genre: 'Architecture',
    items: [
      'Microservices',
      'Event-Driven Architecture',
      'Distributed Systems',
      'Clean Architecture',
    ],
  },
  {
    genre: 'Practice & Delivery',
    items: ['TDD (xUnit, Moq, AutoFixture)', 'Docker', 'Azure DevOps', 'GitHub Actions'],
  },
]

const LINKEDIN_CERTS = 'https://www.linkedin.com/in/purkayasta/details/certifications/'

export const certifications = [
  {
    title: 'Intermediate Secure Coding in .NET with C# — SecureFlag, Oct 2025',
    link: LINKEDIN_CERTS,
  },
  { title: 'OWASP Top 10:2021 in .NET with C# — Dec 2024', link: LINKEDIN_CERTS },
  {
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900) — Apr 2023',
    link: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
  },
  {
    title: 'Develop and Deploy Windows Applications on Google Cloud Platform',
    link: 'https://www.coursera.org/learn/develop-windows-apps-gcp',
  },
  { title: 'EF SET English Certificate 63/100 (C1 Advanced)', link: 'https://www.efset.org/cert/' },
  { title: 'Pearson PTE Academic', link: LINKEDIN_CERTS },
]

export const languages: string[] = [
  'Bengali (native)',
  'English (professional working)',
  'Hindi (elementary)',
]

export const publication = {
  title: 'Sentiment Analysis of Social Media Using Machine Learning',
  link: 'https://www.linkedin.com/in/purkayasta/details/publications/',
}

export const writing = [
  {
    title: 'Virtual File System (VFS) — The Abstraction',
    topic: 'Linux internals',
    blurb:
      'How the kernel lets one open() call work across ext4, NTFS and NFS — and where that abstraction leaks.',
    link: 'https://pritom.hashnode.dev/vfs',
  },
  {
    title: 'No C Drive?',
    topic: 'Linux internals',
    blurb:
      'Two philosophies of storage: Windows drive letters versus the single unified tree Linux mounts everything into.',
    link: 'https://pritom.hashnode.dev/nocdrive',
  },
  {
    title: 'Common File Systems (ext4, NTFS, Btrfs, ZFS)',
    topic: 'Storage',
    blurb:
      'A short field guide to what each file system actually decides for you, and when the newer ones earn their complexity.',
    link: 'https://pritom.hashnode.dev/filesystem',
  },
  {
    title: 'Understanding the Linux Folder Structure',
    topic: 'Linux internals',
    blurb:
      'What actually lives in /etc, /var, /usr and /opt — the folder tree explained for people arriving from Windows.',
    link: 'https://pritom.hashnode.dev/understanding-the-linux-folder-structure',
  },
  {
    title: 'Harness, Context & Memory Engineering',
    topic: 'AI engineering',
    blurb:
      'The model is the engine; the harness is the rest of the car. Three disciplines that separate a working AI system from a demo.',
    link: 'https://pritompurkayasta.medium.com/harness-context-memory-engineering-fcda46bb1725',
  },
  {
    title: 'Directory-Based / Dynamic Sharding',
    topic: 'Distributed systems',
    blurb:
      'Routing keys through a lookup service instead of a hash function — what it buys you, and what it costs.',
    link: 'https://pritom.hashnode.dev/dynamic-sharding',
  },
  {
    title: 'git commit --amend',
    topic: 'Git',
    blurb:
      'Fixing the last commit — message typos, forgotten files — and the one rule about amending anything already pushed.',
    link: 'https://pritom.hashnode.dev/git-commit-amend',
  },
  {
    title: 'DbContext & DbSet Mocking in C#',
    topic: '.NET testing',
    blurb:
      'Unit-testing EF Core code without a database: mocking DbSet properly instead of fighting the async query provider.',
    link: 'https://pritom.hashnode.dev/dbset-mocking-csharp',
  },
  {
    title: 'HttpClient Mocking in C#',
    topic: '.NET testing',
    blurb:
      'The handler is the seam. Mock HttpMessageHandler and your HTTP-calling code becomes ordinary testable code.',
    link: 'https://pritom.hashnode.dev/mocking-the-httpclient',
  },
  {
    title: 'TLS — The Basics',
    topic: 'Security',
    blurb:
      'The handshake step by step: certificates, key exchange, and what actually protects the bytes on the wire.',
    link: 'https://pritom.hashnode.dev/tls-explained',
  },
  {
    title: 'Concurrency vs Parallelism in C#',
    topic: '.NET',
    blurb:
      'Two words used interchangeably that mean different things — and why the distinction changes how you write async code.',
    link: 'https://pritom.hashnode.dev/concurrency-vs-parallelism',
  },
  {
    title: 'Asynchronous Programming 101 — C#',
    topic: '.NET',
    blurb:
      'What async/await really does to your method, and where the thread goes while you are awaiting.',
    link: 'https://pritom.hashnode.dev/async101',
  },
  {
    title: 'Thread Pool — C#',
    topic: '.NET',
    blurb: 'Why the runtime keeps a pool of threads around, and what happens when you starve it.',
    link: 'https://pritom.hashnode.dev/thread-pool-c',
  },
  {
    title: 'Configure Fingerprint Login on Ubuntu',
    topic: 'Linux',
    blurb:
      'Setting up pam-auth fingerprint authentication on Ubuntu 22.04 so sudo stops asking for a password.',
    link: 'https://pritom.hashnode.dev/configure-fp-ubuntu',
  },
]

export const interests = ['Games', 'Movies', 'Cosmos']

export const contact = {
  email: 'mailto:pritom0purkayasta@gmail.com',
  linkedin: 'https://www.linkedin.com/in/purkayasta',
  github: 'https://github.com/purkayasta',
  nuget: 'https://www.nuget.org/profiles/pritom',
  stackoverflow: 'https://stackoverflow.com/users/5031633/pritom',
  hashnode: 'https://pritom.hashnode.dev',
  medium: 'https://pritompurkayasta.medium.com',
  twitter: 'https://x.com/thepurkayasta',
}
