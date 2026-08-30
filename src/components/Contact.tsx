import { m } from 'framer-motion'
import { contact } from '../data/portfolio'

export function Contact() {
  return (
    <m.section
      id="contact"
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
      <a
        href={contact.email}
        className="mt-6 inline-block text-sm underline decoration-[var(--ink-soft)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
      >
        {contact.email.replace('mailto:', '')}
      </a>
      <p className="mt-16 text-xs text-[var(--ink-soft)]/70">
        © {new Date().getFullYear()} Pritom Purkayasta
      </p>
    </m.section>
  )
}
