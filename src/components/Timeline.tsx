import { m } from 'framer-motion'
import { duration, education, experience } from '../data/portfolio'

export function Timeline() {
  return (
    <>
      <section id="experience" className="mx-auto max-w-2xl px-6 pt-2 pb-16">
        <div className="space-y-10 border-l border-[var(--ink-soft)]/25 pl-6">
          {experience.map((item, i) => (
            <m.div
              key={item.company}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: i === 0 ? 0 : 0.05,
              }}
              className="relative text-left"
            >
              <Node className="-left-[31px] top-1.5 h-3 w-3" />

              <p className="text-xs text-[var(--ink-soft)]">
                {item.period} · {duration(item.period)}
              </p>
              <h3 className="mt-0.5 text-base font-medium">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                  >
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </h3>
              {item.roles.length > 1 && (
                <p className="mt-1 text-[11px] text-[var(--ink-soft)]">
                  Progression:{' '}
                  {item.roles.map((r) => r.title.replace(' Software Engineer', '')).join(' → ')}
                </p>
              )}

              <div className="mt-4 space-y-5 border-l border-dashed border-[var(--ink-soft)]/30 pl-5">
                {[...item.roles].reverse().map((role) => (
                  <div key={role.title} className="relative">
                    <span className="absolute top-[9px] -left-5 w-4 border-t border-dashed border-[var(--ink-soft)]/30" />
                    <Node className="-left-[23px] top-[6px] h-1.5 w-1.5" />

                    <p className="text-sm font-medium">{role.title}</p>
                    <p className="text-[11px] text-[var(--ink-soft)]">
                      {role.period} · {duration(role.period)}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {role.bullets.map((b) => (
                        <li key={b} className="text-sm leading-relaxed text-[var(--ink-soft)]">
                          — {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-2xl px-6 pb-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Education</h2>
        <div className="mt-10 space-y-6 border-l border-[var(--ink-soft)]/25 pl-6">
          {education.map((item) => (
            <m.div
              key={item.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative text-left"
            >
              <Node className="-left-[29px] top-1.5 h-2 w-2" />
              <p className="text-xs text-[var(--ink-soft)]">{item.period}</p>
              <h3 className="mt-0.5 text-sm font-medium">{item.school}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{item.degree}</p>
            </m.div>
          ))}
        </div>
      </section>
    </>
  )
}

function Node({ className }: { className: string }) {
  return (
    <span
      className={`absolute rounded-full bg-[var(--accent)] ring-4 ring-[var(--cream)] ${className}`}
    />
  )
}
