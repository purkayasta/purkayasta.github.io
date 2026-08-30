import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

const SHADE_DURATION = 1.1

export function AirplaneWindow({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <button
        type="button"
        aria-label={isOpen ? 'Close the window shade' : 'Open the window shade'}
        onClick={onToggle}
        className="relative h-[380px] w-[280px] rounded-t-[140px] rounded-b-3xl bg-gradient-to-b from-neutral-300 to-neutral-400 p-3 shadow-2xl transition-transform active:scale-[0.98] sm:h-[440px] sm:w-[320px] dark:from-neutral-700 dark:to-neutral-800"
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-[120px] rounded-b-2xl border-4 border-neutral-500/40">
          {/* sky scene */}
          <div
            className={`absolute inset-0 transition-colors duration-[1400ms] ${
              isOpen
                ? 'bg-gradient-to-b from-sky-300 via-sky-200 to-orange-100'
                : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
            }`}
          >
            {/* sun / moon */}
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0.9 }}
              transition={{ duration: 1.2 }}
              className={`absolute top-8 left-10 h-14 w-14 rounded-full ${
                isOpen ? 'bg-yellow-200 shadow-[0_0_50px_20px_rgba(254,240,138,0.7)]' : 'bg-slate-200 shadow-[0_0_30px_10px_rgba(226,232,240,0.4)]'
              }`}
            />

            {/* stars, night only */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
              {STAR_POSITIONS.map(([top, left], i) => (
                <span
                  key={i}
                  className="absolute h-[3px] w-[3px] rounded-full bg-white"
                  style={{ top: `${top}%`, left: `${left}%` }}
                />
              ))}
            </div>

            {/* clouds, drift forever */}
            <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-90' : 'opacity-20'}`}>
              <div className="animate-drift-slow absolute top-16 h-6 w-24 rounded-full bg-white/80 blur-sm" />
              <div className="animate-drift-medium absolute top-28 h-8 w-32 rounded-full bg-white/70 blur-sm" />
              <div className="animate-drift-fast absolute top-40 h-5 w-20 rounded-full bg-white/60 blur-sm" />
            </div>

            {/* mountains */}
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 320 140"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,140 40,60 90,110 150,30 210,100 260,50 320,140"
                className={isOpen ? 'fill-indigo-300/70' : 'fill-slate-800'}
              />
              <polygon
                points="0,140 60,90 120,130 180,70 240,120 320,80 320,140"
                className={isOpen ? 'fill-indigo-400/80' : 'fill-slate-900'}
              />
            </svg>
          </div>

          {/* shade */}
          <motion.div
            initial={false}
            animate={{ y: isOpen ? '-100%' : '0%' }}
            transition={{ duration: SHADE_DURATION, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-neutral-800 dark:to-neutral-950"
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-10"
      >
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
        <p className="mt-3 text-lg text-[var(--ink-soft)]">{profile.title}</p>
        <p className="mt-1 text-base text-[var(--ink-soft)]">{profile.tagline}</p>
        <p className="mt-6 text-sm text-[var(--ink-soft)]">
          Click the window to {isOpen ? 'close the shade' : 'let the light in'}.
        </p>
      </motion.div>
    </section>
  )
}

const STAR_POSITIONS: Array<[number, number]> = [
  [10, 20], [15, 60], [22, 80], [30, 35], [8, 45],
  [40, 15], [18, 90], [35, 65], [12, 70], [25, 10],
]
