import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'

export function Timeline() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Experience</h2>

      <div className="mt-16 space-y-14 border-l border-[var(--ink-soft)]/25 pl-8">
        {experience.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative text-left"
          >
            <span className="absolute top-1.5 -left-[38px] h-3 w-3 rounded-full bg-[var(--ink)] dark:bg-[#d7dae2]" />
            <p className="text-sm text-[var(--ink-soft)]">{item.period}</p>
            <h3 className="mt-1 text-xl font-medium">{item.role}</h3>
            <p className="text-[var(--ink-soft)]">{item.company}</p>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
