import { useEffect, useState } from 'react'

const KEY = 'accent'

// Swatch colours mirror each theme's --accent, defined in index.css.
const ACCENTS = [
  { id: 'sky', label: 'Sky', swatch: '#6aa9dd' },
  { id: 'brick', label: 'Brick', swatch: '#c2503f' },
  { id: 'neon', label: 'Neon', swatch: '#3dff8f' },
] as const

type AccentId = (typeof ACCENTS)[number]['id']

const stored = (): AccentId => {
  try {
    const saved = localStorage.getItem(KEY)
    return ACCENTS.find(({ id }) => id === saved)?.id ?? 'sky'
  } catch {
    return 'sky'
  }
}

export function AccentSwitch() {
  const [accent, setAccent] = useState<AccentId>(stored)

  useEffect(() => {
    document.documentElement.dataset.accent = accent
    try {
      localStorage.setItem(KEY, accent)
    } catch {
      return
    }
  }, [accent])

  return (
    <div
      role="radiogroup"
      aria-label="Accent colour"
      className="glass fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full px-2.5 py-2"
    >
      {ACCENTS.map(({ id, label, swatch }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={accent === id}
          aria-label={`${label} accent`}
          title={`${label} accent`}
          onClick={() => setAccent(id)}
          className={`h-4 w-4 cursor-pointer rounded-full transition-[opacity,box-shadow] duration-300 ${
            accent === id
              ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--cream)]'
              : 'opacity-60 hover:opacity-100'
          }`}
          style={{ background: swatch }}
        />
      ))}
    </div>
  )
}
