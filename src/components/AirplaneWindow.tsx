import { m } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { SocialLinks } from './SocialLinks'

const SHADE_DURATION = 1.1

const HINT_KEY = 'shade-hint-seen'
const hintSeen = () => {
  try {
    return localStorage.getItem(HINT_KEY) === '1'
  } catch {
    return true
  }
}
const markHintSeen = () => {
  try {
    localStorage.setItem(HINT_KEY, '1')
  } catch {
    return
  }
}

const APERTURE_RADIUS = '42% / 30%'

const SEATS = 9
const CENTER = Math.floor(SEATS / 2)

const SCENE_W = 400
const PANE_W = 100
const CENTER_PAN = (SCENE_W - PANE_W) / 2

const DEPTH = [
  { opacity: 1, blur: 0, scale: 1 },
  { opacity: 0.6, blur: 1.5, scale: 0.97 },
  { opacity: 0.4, blur: 2.5, scale: 0.94 },
  { opacity: 0.26, blur: 3.5, scale: 0.9 },
  { opacity: 0.16, blur: 4.5, scale: 0.86 },
]

const VISIBILITY = ['', '', 'hidden sm:block', 'hidden md:block', 'hidden lg:block']

export function AirplaneWindow({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean, delayMs: number) => void
}) {
  const hero = useRef<HTMLElement>(null)
  const [centerOpen, setCenterOpen] = useState(true)
  const [showHint, setShowHint] = useState(() => !hintSeen())

  useEffect(() => {
    const el = hero.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) =>
      el.classList.toggle('anim-paused', !entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggleCenter = () => {
    const next = !centerOpen
    setCenterOpen(next)
    onOpenChange(next, next ? 0 : SHADE_DURATION * 1000)
    if (showHint) {
      setShowHint(false)
      markHintSeen()
    }
  }

  return (
    <section
      ref={hero}
      id="intro"
      className="flex min-h-[78svh] flex-col items-center justify-end px-4 pt-[24vh] pb-4 text-center"
    >
      <div className="relative flex items-center justify-center gap-2 sm:gap-3">
        {showHint && (
          <m.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            style={{ '--reveal-delay': '900ms' } as CSSProperties}
            className="theme-fade pointer-events-none absolute -top-11 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="glass rounded-full px-3 py-1.5 text-[11px] text-[var(--ink-soft)]">
              Pull the shade down
            </span>
            <m.span
              aria-hidden="true"
              whileInView={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-0.5 block text-center text-xs text-[var(--accent)]"
            >
              ↓
            </m.span>
          </m.div>
        )}
        <div
          className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 blur-2xl"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(126,168,204,0.22), transparent 70%)',
          }}
        />
        {Array.from({ length: SEATS }, (_, i) => {
          const dist = Math.abs(i - CENTER)
          return (
            <WindowSeat
              key={i}
              isOpen={dist === 0 ? centerOpen : false}
              interactive={dist === 0}
              onClick={dist === 0 ? toggleCenter : undefined}
              dist={dist}
            />
          )
        })}
      </div>

      <div className="mt-7">
        <h1
          className="theme-fade text-xl font-semibold tracking-tight sm:text-2xl"
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
        >
          {profile.name}
        </h1>
        <p
          className="theme-fade mt-1.5 text-sm text-[var(--ink-soft)]"
          style={{ '--reveal-delay': '220ms' } as CSSProperties}
        >
          {profile.title}
        </p>
        <p
          className="theme-fade mx-auto mt-1 max-w-md text-xs leading-relaxed text-[var(--ink-soft)]"
          style={{ '--reveal-delay': '360ms' } as CSSProperties}
        >
          {profile.tagline}
        </p>
        <div className="theme-fade" style={{ '--reveal-delay': '500ms' } as CSSProperties}>
          <SocialLinks className="mt-4 text-xs text-[var(--ink-soft)]" />
        </div>
      </div>

      <FlightPath />
    </section>
  )
}

function WindowSeat({
  isOpen,
  interactive = false,
  onClick,
  dist,
}: {
  isOpen: boolean
  interactive?: boolean
  onClick?: () => void
  dist: number
}) {
  const Tag = interactive ? m.button : m.div
  const depth = DEPTH[Math.min(dist, DEPTH.length - 1)]

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      aria-label={
        interactive ? (isOpen ? 'Close the window shade' : 'Open the window shade') : undefined
      }
      aria-hidden={interactive ? undefined : true}
      tabIndex={interactive ? undefined : -1}
      onClick={interactive ? onClick : undefined}
      className={`relative h-[105px] w-[76px] shrink-0 p-[5px] sm:h-[123px] sm:w-[88px] ${
        interactive
          ? 'cursor-pointer transition-transform active:scale-[0.99]'
          : VISIBILITY[Math.min(dist, 4)]
      }`}
      style={{
        borderRadius: APERTURE_RADIUS,
        background: 'linear-gradient(165deg, #7e929c 0%, #47585f 46%, #1d2a31 100%)',
        boxShadow:
          'inset 0 2px 3px rgba(6,16,24,0.6), inset 0 -1px 0 rgba(214,232,245,0.28), 0 18px 44px -14px rgba(12,32,50,0.55)',
        opacity: depth.opacity,
        filter: depth.blur ? `blur(${depth.blur}px)` : undefined,
        transform: `scale(${depth.scale})`,
      }}
    >
      {interactive && (
        <span
          className={`absolute top-1 right-2.5 z-20 h-1 w-1 rounded-full transition-all duration-700 ${
            isOpen
              ? 'bg-sky-300 shadow-[0_0_6px_2px_rgba(125,211,252,0.9)]'
              : 'bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.8)]'
          }`}
        />
      )}

      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: APERTURE_RADIUS,
          boxShadow: 'inset 0 0 0 1.5px rgba(10,14,22,0.75), inset 0 0 26px rgba(6,10,20,0.55)',
        }}
      >
        {interactive && <Sky isOpen={isOpen} panX={CENTER_PAN} />}

        <m.div
          initial={false}
          animate={{ y: isOpen ? '-87%' : '0%' }}
          transition={
            interactive ? { duration: SHADE_DURATION, ease: 'easeInOut' } : { duration: 0 }
          }
          className="group absolute inset-0 z-10 flex flex-col items-center justify-end rounded-b-[9px] pb-[5px]"
          style={{
            background:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 4px), linear-gradient(180deg, #eaf0f4 0%, #d3dde4 46%, #b6c3cc 88%, #9fadb7 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -3px 6px -2px rgba(16,44,66,0.22), 0 5px 12px -4px rgba(16,44,66,0.35)',
          }}
        >
          {interactive && (
            <span
              className="h-[5px] w-9 rounded-full transition-all duration-300 group-hover:w-11"
              style={{
                background: 'linear-gradient(180deg, rgba(16,44,66,0.16), rgba(16,44,66,0.06))',
                boxShadow:
                  'inset 0 1px 1.5px rgba(16,44,66,0.35), inset 0 -1px 0 rgba(255,255,255,0.85)',
              }}
            />
          )}
        </m.div>

        <div
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
          style={{
            background:
              'linear-gradient(118deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 22%, transparent 46%), radial-gradient(120% 60% at 80% 8%, rgba(255,255,255,0.14), transparent 60%)',
          }}
        />
      </div>
    </Tag>
  )
}

function Sky({ isOpen, panX }: { isOpen: boolean; panX: number }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          opacity: isOpen ? 1 : 0,
          background:
            'linear-gradient(180deg, #1c4d7c 0%, #3d7cae 26%, #7cadd2 44%, #b6d3e6 58%, #d8e7f0 68%, #b9cfdc 80%, #8ea9ba 100%)',
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          opacity: isOpen ? 0 : 1,
          background: 'linear-gradient(180deg, #030a14 0%, #071726 40%, #0d2b42 72%, #14405f 100%)',
        }}
      />

      <Layer panX={panX} speed="drift-far" opacity={isOpen ? 0 : 0.9}>
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" />
        ))}
      </Layer>

      <div
        className="absolute inset-x-0 top-[46%] h-[28%] transition-opacity duration-1000"
        style={{
          opacity: isOpen ? 1 : 0,
          background:
            'radial-gradient(80% 100% at 30% 60%, rgba(226,240,248,0.85), transparent 72%)',
        }}
      />

      <Cirrus isOpen={isOpen} panX={panX} />
      <Ridges isOpen={isOpen} panX={panX} />

      <Wing isOpen={isOpen} />
    </div>
  )
}

const ridge = (peaks: number[]) => {
  const pts = [...peaks, peaks[0]]
  return (
    `M0 ${pts[0]} ` +
    pts
      .slice(1)
      .map((y, i) => `L${(((i + 1) * SCENE_W) / peaks.length).toFixed(1)} ${y}`)
      .join(' ') +
    ` L${SCENE_W} 100 L0 100 Z`
  )
}

const FAR = ridge([72, 66, 74, 63, 71, 64, 70, 62, 73, 67, 71, 65, 72, 68, 70, 66, 73, 69, 71, 67])
const NEAR = ridge([84, 76, 70, 62, 66, 58, 65, 61, 70, 78, 82, 74, 68, 71, 64, 69, 75, 80, 85, 88])
const HAZE = ridge([92, 88, 93, 89, 92, 90, 93, 88, 91, 90, 92, 89, 93, 91, 90, 92, 89, 93, 91, 92])

function Layer({
  panX,
  speed,
  opacity,
  children,
}: {
  panX: number
  speed: string
  opacity: number
  children: ReactNode
}) {
  return (
    <div
      className="absolute inset-y-0 overflow-hidden transition-opacity duration-1000"
      style={{ left: `${-panX}%`, width: `${SCENE_W * 2}%`, opacity }}
    >
      <svg
        viewBox={`0 0 ${SCENE_W * 2} 100`}
        preserveAspectRatio="none"
        className={`${speed} h-full w-full`}
      >
        <g>{children}</g>
        <g transform={`translate(${SCENE_W} 0)`}>{children}</g>
      </svg>
    </div>
  )
}

function Ridges({ isOpen, panX }: { isOpen: boolean; panX: number }) {
  return (
    <Layer panX={panX} speed="drift-mid" opacity={1}>
      <path
        d={FAR}
        className="transition-colors duration-[1400ms]"
        fill={isOpen ? '#8fadc2' : '#0f2537'}
        opacity={isOpen ? 0.65 : 0.85}
      />
      <path
        d={NEAR}
        className="transition-colors duration-[1400ms]"
        fill={isOpen ? '#4c6577' : '#081824'}
      />
      <path
        d={HAZE}
        className="transition-colors duration-[1400ms]"
        fill={isOpen ? '#b7cfdd' : '#102c42'}
        opacity="0.55"
      />
    </Layer>
  )
}

const CIRRUS: Array<[number, number, number]> = [
  [24, 48, 16],
  [78, 52, 22],
  [140, 46, 14],
  [188, 54, 26],
  [246, 49, 18],
  [300, 53, 20],
  [352, 47, 15],
  [390, 51, 24],
]

function Cirrus({ isOpen, panX }: { isOpen: boolean; panX: number }) {
  return (
    <Layer panX={panX} speed="drift-near" opacity={isOpen ? 0.75 : 0.18}>
      {CIRRUS.map(([x, y, w], i) => (
        <ellipse key={i} cx={x} cy={y} rx={w} ry="1.8" fill={isOpen ? '#ffffff' : '#7fa8cb'} />
      ))}
    </Layer>
  )
}

function Wing({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full transition-opacity duration-1000"
      style={{ opacity: isOpen ? 0.95 : 0.5 }}
    >
      <defs>
        <linearGradient id="wing" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={isOpen ? '#ffffff' : '#8ea6bb'} />
          <stop offset="60%" stopColor={isOpen ? '#dbe4ea' : '#5d7488'} />
          <stop offset="100%" stopColor={isOpen ? '#a8b8c4' : '#33465a'} />
        </linearGradient>
      </defs>

      <path d="M36 30 L44 42 L100 100 L100 74 Z" fill="url(#wing)" />
      <path d="M36 30 L31 17 L39 20 L44 42 Z" fill={isOpen ? '#e0392b' : '#8c3128'} />
      <path
        d="M36 30 L100 88"
        stroke={isOpen ? '#ffffff' : '#a8c0d4'}
        strokeWidth="0.7"
        opacity="0.65"
      />
    </svg>
  )
}

const STARS: Array<[number, number, number]> = [
  [18, 8, 0.7],
  [52, 14, 0.5],
  [96, 20, 0.7],
  [134, 28, 0.4],
  [40, 6, 0.5],
  [172, 36, 0.7],
  [212, 16, 0.4],
  [248, 32, 0.5],
  [286, 11, 0.4],
  [318, 24, 0.5],
  [352, 42, 0.4],
  [382, 12, 0.4],
  [64, 30, 0.5],
  [148, 46, 0.4],
  [230, 44, 0.5],
  [268, 22, 0.4],
  [300, 38, 0.5],
  [340, 9, 0.4],
  [110, 40, 0.4],
  [196, 26, 0.5],
]

type Point = [number, number]

const P0: Point = [24, 148]
const PC: Point = [200, 14]
const P1: Point = [376, 148]

const at = (t: number): Point => {
  const u = 1 - t
  return [
    u * u * P0[0] + 2 * u * t * PC[0] + t * t * P1[0],
    u * u * P0[1] + 2 * u * t * PC[1] + t * t * P1[1],
  ]
}

const angleAt = (t: number) => {
  const dx = 2 * (1 - t) * (PC[0] - P0[0]) + 2 * t * (P1[0] - PC[0])
  const dy = 2 * (1 - t) * (PC[1] - P0[1]) + 2 * t * (P1[1] - PC[1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

const STEPS = Array.from({ length: 41 }, (_, i) => i / 40)
const PATH = `M${P0[0]} ${P0[1]} Q${PC[0]} ${PC[1]} ${P1[0]} ${P1[1]}`

function FlightPath() {
  return (
    <div
      style={{ '--reveal-delay': '480ms' } as CSSProperties}
      className="theme-fade relative -mb-4 w-full max-w-3xl"
    >
      <svg viewBox="0 0 400 180" className="pointer-events-none h-28 w-full sm:h-36">
        <defs>
          <linearGradient id="trail-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <m.path
          d={PATH}
          fill="none"
          stroke="url(#trail-fade)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
        />

        <m.g
          initial={false}
          whileInView={{
            x: STEPS.map((t) => at(t)[0]),
            y: STEPS.map((t) => at(t)[1]),
            rotate: STEPS.map(angleAt),
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d="M9 0 -6 -5.5 -4 -0.9 -1.5 -0.9 -6 3.2 -3.6 3.2 Z"
            fill="var(--accent)"
            opacity="0.85"
          />
        </m.g>
      </svg>

      <a
        href="#experience"
        className="mx-auto -mt-4 block w-fit text-xs text-[var(--ink-soft)] underline decoration-[var(--ink-soft)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
      >
        Experience ↓
      </a>
    </div>
  )
}
