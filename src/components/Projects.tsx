import { m } from 'framer-motion'
import { projects } from '../data/portfolio'

export function Projects() {
  return (
    <section id="projects" className="w-full px-6 py-16 sm:px-10">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Projects</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--ink-soft)]">
        Side projects that stay local-first — AI tooling, developer utilities, and small browser
        apps.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {projects.map((project, i) => (
          <m.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className="glass flex min-h-[170px] flex-col rounded-2xl p-5 shadow-[0_14px_34px_-16px_rgba(12,32,50,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_-16px_rgba(12,32,50,0.55)]"
          >
            <p className="text-[10px] tracking-[0.14em] text-[var(--accent)] uppercase">
              {project.tech.join(' · ')}
            </p>
            <p className="mt-2 text-sm leading-snug font-medium">{project.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
              {project.description}
            </p>
            <p className="mt-auto pt-4 text-[11px] tracking-wide text-[var(--ink-soft)] uppercase">
              {project.note ?? 'GitHub'}
            </p>
          </m.a>
        ))}
      </div>
    </section>
  )
}
