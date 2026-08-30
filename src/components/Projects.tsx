import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'

export function Projects() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Projects</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-[var(--ink-soft)]/20 bg-[var(--cream-2)]/60 p-6 text-left transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full bg-black/5 px-2.5 py-1 text-xs dark:bg-white/10">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
