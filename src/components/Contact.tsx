import { motion } from 'framer-motion'
import { contact } from '../data/portfolio'

export function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-2xl px-6 py-24 text-center"
    >
      <h2 className="text-3xl font-semibold tracking-tight">Get in touch</h2>
      <p className="mt-3 text-[var(--ink-soft)]">
        Always happy to talk about interesting problems or new opportunities.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
          {contact.email}
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          GitHub
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          LinkedIn
        </a>
      </div>
      <p className="mt-16 text-xs text-[var(--ink-soft)]/70">
        © {new Date().getFullYear()} Pritom Sunny Purkayasta
      </p>
    </motion.section>
  )
}
