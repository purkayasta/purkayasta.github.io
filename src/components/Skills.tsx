import { m } from 'framer-motion'
import { certifications, languages, publication, skills } from '../data/portfolio'
import { PixelIcon } from './PixelIcon'

const GENRE_ICONS: Record<string, string[]> = {
  'Languages & Runtimes': [
    '..#..#..',
    '.#....#.',
    '.#....#.',
    '#......#',
    '#......#',
    '.#....#.',
    '.#....#.',
    '..#..#..',
  ],
  'Web & UI': [
    '########',
    '##.#...#',
    '########',
    '#......#',
    '#......#',
    '#......#',
    '#......#',
    '########',
  ],
  'AI & Agents': [
    '..#..#..',
    '..#..#..',
    '.######.',
    '.#.##.#.',
    '.######.',
    '.######.',
    '..####..',
    '........',
  ],
  'Cloud & Azure': [
    '........',
    '...##...',
    '..####..',
    '.#####..',
    '.#######',
    '########',
    '########',
    '........',
  ],
  'Data & Storage': [
    '.######.',
    '#......#',
    '.######.',
    '#......#',
    '#......#',
    '#......#',
    '.######.',
    '........',
  ],
  Architecture: [
    '..####..',
    '..####..',
    '........',
    '########',
    '########',
    '........',
    '########',
    '########',
  ],
  'Practice & Delivery': [
    '........',
    '.......#',
    '......##',
    '.....##.',
    '#...##..',
    '##.##...',
    '.###....',
    '..#.....',
  ],
}

const MAX = Math.max(...skills.map((g) => g.items.length))

function Meter({ count }: { count: number }) {
  return (
    <svg
      viewBox={`0 0 ${MAX * 4 - 1} 8`}
      className="h-2 w-auto"
      style={{ width: MAX * 5 }}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {Array.from({ length: MAX }, (_, i) => (
        <m.rect
          key={i}
          x={i * 4}
          y="0"
          width="3"
          height="8"
          fill={i < count ? 'var(--accent)' : 'var(--ink-soft)'}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: i < count ? 1 : 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
        />
      ))}
    </svg>
  )
}

export function Skills() {
  return (
    <>
      <section id="skills" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Skills</h2>

        <div className="mt-10 space-y-7">
          {skills.map((group, i) => (
            <m.div
              key={group.genre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div className="flex items-center gap-2.5 text-[var(--accent)]">
                <PixelIcon rows={GENRE_ICONS[group.genre]} className="h-3.5 w-3.5" />
                <h3 className="text-[11px] tracking-[0.16em] uppercase">{group.genre}</h3>
                <span className="h-px flex-1 bg-[var(--ink-soft)]/20" />
                <span className="text-[10px] tabular-nums text-[var(--ink-soft)]">
                  {group.items.length}
                </span>
                <Meter count={group.items.length} />
              </div>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span key={item} className="glass rounded-full px-4 py-2 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </section>

      <section id="certifications" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Certifications</h2>
        <ul className="mt-8 space-y-2 text-center text-sm text-[var(--ink-soft)]">
          {certifications.map((cert) => (
            <li key={cert.title}>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[var(--ink-soft)]/40 underline-offset-4 hover:decoration-[var(--accent)]"
              >
                {cert.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="languages" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Languages</h2>
        <p className="mt-8 text-center text-sm text-[var(--ink-soft)]">{languages.join(' · ')}</p>
      </section>

      <section id="publication" className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Publication</h2>
        <p className="mt-8 text-center text-sm text-[var(--ink-soft)]">
          <a
            href={publication.link}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[var(--ink-soft)]/40 underline-offset-4 hover:decoration-[var(--accent)]"
          >
            {publication.title}
          </a>
        </p>
      </section>
    </>
  )
}
