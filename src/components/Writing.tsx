import { m } from 'framer-motion'
import { writing, contact } from '../data/portfolio'

export function Writing() {
  return (
    <section id="writing" className="w-full px-6 py-16 sm:px-10">
      <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Writing</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--ink-soft)]">
        Notes on Linux internals, distributed systems, and the engineering around AI models.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {writing.map((post, i) => (
          <m.a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.07 }}
            className="glass flex min-h-[170px] flex-col rounded-2xl p-5 shadow-[0_14px_34px_-16px_var(--glass-shadow)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_22px_44px_-16px_var(--glass-shadow)]"
          >
            <p className="text-[10px] tracking-[0.14em] text-[var(--accent)] uppercase">
              {post.topic}
            </p>
            <p className="mt-2 text-sm leading-snug font-medium">{post.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{post.blurb}</p>
            <p className="mt-auto pt-4 text-[11px] tracking-wide text-[var(--ink-soft)] uppercase">
              {post.link.includes('hashnode') ? 'Hashnode' : 'Medium'}
            </p>
          </m.a>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-[var(--ink-soft)]">
        More on{' '}
        <a
          href={contact.hashnode}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          Hashnode
        </a>{' '}
        and{' '}
        <a
          href={contact.medium}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          Medium
        </a>
        .
      </p>
    </section>
  )
}
