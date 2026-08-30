import { useEffect, useState } from 'react'

const SECTIONS: Array<[string, string]> = [
  ['intro', 'Intro'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['certifications', 'Certifications'],
  ['languages', 'Languages'],
  ['publication', 'Publication'],
  ['projects', 'Projects'],
  ['writing', 'Writing'],
  ['interests', 'Interests'],
  ['contact', 'Get in touch'],
]

export function SectionIndex() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        setActive(SECTIONS.find(([id]) => visible.has(id))?.[0] ?? '')
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    for (const [id] of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const hidden = active === '' || active === 'intro'

  return (
    <nav
      aria-label="Sections"
      aria-hidden={hidden}
      className={`theme-fade fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 transition-[opacity,transform] duration-500 lg:block ${
        hidden ? 'pointer-events-none translate-x-6 opacity-0' : 'opacity-100'
      }`}
    >
      <ul className="space-y-4 border-r border-[var(--ink-soft)]/25 pr-4">
        {SECTIONS.map(([id, label]) => {
          const isActive = active === id
          return (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center justify-end gap-2.5"
              >
                <span
                  className={`text-[10px] tracking-[0.14em] uppercase transition-[opacity,color] duration-300 group-hover:opacity-100 ${
                    isActive
                      ? 'text-[var(--accent)] opacity-100'
                      : 'text-[var(--ink-soft)] opacity-0'
                  }`}
                >
                  {label}
                </span>

                <span
                  className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-[calc(50%+16px)] rounded-full ring-4 ring-[var(--cream)] transition-[width,height,background-color] duration-300 ${
                    isActive
                      ? 'h-2.5 w-2.5 bg-[var(--accent)]'
                      : 'h-1.5 w-1.5 bg-[var(--ink-soft)]/50 group-hover:bg-[var(--accent)]'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
