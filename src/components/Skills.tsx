import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

export function Skills() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Skills</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--ink-soft)]/25 bg-[var(--cream-2)] px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
