import { m } from 'framer-motion'
import { interests } from '../data/portfolio'

const ICONS: Record<string, string> = {
  Poetry: 'M4 20c6-1 9-4 12-9l2-5-5 2c-5 3-8 6-9 12M9 15l6-6',
  Games:
    'M7 10h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5.5 1.7L14 15h-4l-1.5 1.7A3 3 0 0 1 3 15v-1a4 4 0 0 1 4-4M8 12v3M6.5 13.5h3M15.5 13h.01M17.5 15h.01',
  Movies: 'M3 7h18v12H3zM3 7l3-4M9 7l3-4M15 7l3-4M3 12h18',
  Cosmos: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M4 12c4-4 12-4 16 0M20 12c-4 4-12 4-16 0',
}

export function Interests() {
  return (
    <section id="interests" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-center text-3xl font-semibold tracking-tight">Interests</h2>

      <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        {interests.map((label, i) => (
          <m.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass flex items-center gap-2.5 rounded-full py-2.5 pr-5 pl-4 shadow-[0_12px_28px_-16px_rgba(12,32,50,0.45)]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={ICONS[label]} />
            </svg>
            <span className="text-sm">{label}</span>
          </m.div>
        ))}
      </div>
    </section>
  )
}
