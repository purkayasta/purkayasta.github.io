import { m } from 'framer-motion'
import type { CSSProperties, ReactNode, RefObject } from 'react'
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

export function AirplaneWindow() {
  const hero = useRef<HTMLElement>(null)
  const [centerOpen, setCenterOpen] = useState(true)
  const [showHint, setShowHint] = useState(() => !hintSeen())

  useEffect(() => {
    document.documentElement.dataset.lit = centerOpen ? 'on' : 'off'
  }, [centerOpen])

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
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[105px] w-[76px] -translate-x-1/2 -translate-y-1/2 blur-[10px] sm:h-[123px] sm:w-[88px]"
          style={{
            borderRadius: APERTURE_RADIUS,
            background: 'var(--glow)',
            boxShadow: '0 0 34px 8px var(--glow), 0 0 90px 30px var(--glow)',
            opacity: centerOpen ? 1 : 0,
            transition: 'opacity var(--theme-ms) linear',
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
          className={`absolute top-1 right-2.5 z-20 h-1 w-1 rounded-full transition-[background-color,box-shadow] duration-700 ${
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
              className="h-[5px] w-9 rounded-full transition-[width] duration-300 group-hover:w-11"
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
          background: 'var(--w-day)',
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          opacity: isOpen ? 0 : 1,
          background: 'var(--w-night)',
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
          background: 'radial-gradient(80% 100% at 30% 60%, var(--w-glow), transparent 72%)',
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
        style={{ fill: isOpen ? 'var(--w-ridge-far)' : 'var(--w-nridge-far)' }}
        opacity={isOpen ? 0.65 : 0.85}
      />
      <path
        d={NEAR}
        className="transition-colors duration-[1400ms]"
        style={{
          fill: isOpen ? 'var(--w-ridge-near)' : 'var(--w-nridge-near)',
        }}
      />
      <path
        d={HAZE}
        className="transition-colors duration-[1400ms]"
        style={{
          fill: isOpen ? 'var(--w-ridge-haze)' : 'var(--w-nridge-haze)',
        }}
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
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={w}
          ry="1.8"
          className="transition-colors duration-[1400ms]"
          style={{ fill: isOpen ? 'var(--w-cirrus)' : 'var(--w-ncirrus)' }}
        />
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
          <stop
            offset="0%"
            style={{
              stopColor: isOpen ? 'var(--w-wing-1)' : 'var(--w-nwing-1)',
            }}
          />
          <stop
            offset="60%"
            style={{
              stopColor: isOpen ? 'var(--w-wing-2)' : 'var(--w-nwing-2)',
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: isOpen ? 'var(--w-wing-3)' : 'var(--w-nwing-3)',
            }}
          />
        </linearGradient>
      </defs>

      <path d="M36 30 L44 42 L100 100 L100 74 Z" fill="url(#wing)" />
      <path
        d="M36 30 L31 17 L39 20 L44 42 Z"
        style={{ fill: isOpen ? 'var(--w-fin)' : 'var(--w-nfin)' }}
      />
      <path
        d="M36 30 L100 88"
        style={{ stroke: isOpen ? 'var(--w-strut)' : 'var(--w-nstrut)' }}
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

// top-down orbit around the sun: a tilted ellipse, nudged out of round so it
// reads as a hand-flown circuit rather than a geometry lesson
const CENTRE: Point = [200, 92]
const TILT = (-7 * Math.PI) / 180

const orbit = (a: number): Point => {
  const r = 1 + 0.07 * Math.sin(3 * a) - 0.05 * Math.cos(2 * a)
  const [x, y] = [168 * r * Math.cos(a), 66 * r * Math.sin(a)]
  return [
    CENTRE[0] + x * Math.cos(TILT) - y * Math.sin(TILT),
    CENTRE[1] + x * Math.sin(TILT) + y * Math.cos(TILT),
  ]
}

const SAMPLES = 240
const LOOP: Point[] = Array.from({ length: SAMPLES }, (_, i) => orbit((i / SAMPLES) * 2 * Math.PI))

const lerp = (a: Point, b: Point, t: number): Point => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
]

const dist = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1])

// resample at constant speed so the plane holds one cruising pace all the way round
const FRAMES = 60
const CUM = LOOP.reduce<number[]>(
  (acc, pt, i) => (acc.push(i === 0 ? 0 : acc[i - 1] + dist(LOOP[i - 1], pt)), acc),
  [],
)
const TOTAL = CUM[CUM.length - 1] + dist(LOOP[LOOP.length - 1], LOOP[0])

const atLength = (d: number): Point => {
  const i = CUM.findIndex((c) => c > d)
  if (i <= 0) return LOOP[0]
  return lerp(LOOP[i - 1], LOOP[i], (d - CUM[i - 1]) / (CUM[i] - CUM[i - 1]))
}

const POINTS = Array.from({ length: FRAMES }, (_, i) => atLength((i * TOTAL) / FRAMES))

// inner→outer, roughly Mercury..Saturn in relative size; the ringed one is Saturn
const PLANETS = [
  { r: 2.2, ring: false },
  { r: 3.2, ring: false },
  { r: 3.4, ring: false },
  { r: 2.6, ring: false },
  { r: 6.2, ring: false },
  { r: 5.2, ring: true },
  { r: 4.0, ring: false },
]
const STAGGER = 0.5

const rand = (min: number, max: number) => min + Math.random() * (max - min)

// each planet keeps its own orbit and pace: lanes climb outwards, periods climb
// with them (Kepler, loosely), and the jitter is wide enough that neighbouring
// lanes overlap — which is how two of them ever end up in the same bit of sky.
const newPlanet = (i: number, delay: number) => ({
  delay,
  bornAt: performance.now(),
  duration: rand(7 + i * 2.4, 10 + i * 2.4),
  lane: 0.34 + i * 0.11 + rand(-0.05, 0.05),
  gen: 0,
  status: 'fly' as 'fly' | 'sucked' | 'gone',
  hole: null as Point | null, // where it stops orbiting and starts falling
  ...PLANETS[i],
})

const SUCK_S = 1.15 // planet leaves its orbit and falls into the hole
const RESPAWN_S = 4 // …and the sky is short one planet until it reforms

// pull the circuit in or out around its centre to give a planet its own orbit
const laneFlight = (lane: number) => {
  const shift = (p: Point, d: 0 | 1) => CENTRE[d] + (p[d] - CENTRE[d]) * lane
  return {
    x: [...POINTS.map((p) => shift(p, 0)), shift(POINTS[0], 0)],
    y: [...POINTS.map((p) => shift(p, 1)), shift(POINTS[0], 1)],
  }
}

const lanePath = (lane: number) =>
  `M${LOOP.map((p) => `${(CENTRE[0] + (p[0] - CENTRE[0]) * lane).toFixed(1)} ${(CENTRE[1] + (p[1] - CENTRE[1]) * lane).toFixed(1)}`).join('L')}Z`

const NEAR_MISS = 11 // viewBox units between two planets that counts as a collision
const DEBRIS = Array.from({ length: 10 }, (_, i) => (i * Math.PI * 2) / 10)

type Party = { id: number; x: number; y: number }

// watch the live transforms rather than replaying the timing maths — whatever the
// browser actually painted is the only truth about where the planets are
function useNearMisses(
  svg: RefObject<SVGSVGElement | null>,
  planets: RefObject<(SVGGElement | null)[]>,
  airborneAt: RefObject<number[]>,
  onHit: RefObject<(a: number, b: number, x: number, y: number) => void>,
) {
  const [parties, setParties] = useState<Party[]>([])

  useEffect(() => {
    let frame = 0
    const touching = new Set<string>() // pairs already partying, so each pass fires once

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const toViewBox = svg.current?.getScreenCTM()?.inverse()
      if (!toViewBox) return

      // planet origins, screen space → viewBox units so the burst lands on the SVG grid.
      // A planet still waiting out its stagger delay is parked on the start line and
      // does not count as traffic yet.
      const spots = planets.current.map((el, i) => {
        const at = now < (airborneAt.current[i] ?? Infinity) ? null : el?.getScreenCTM()
        return at && new DOMPoint(at.e, at.f).matrixTransform(toViewBox)
      })

      for (let a = 0; a < spots.length; a++) {
        for (let b = a + 1; b < spots.length; b++) {
          const [p, q] = [spots[a], spots[b]]
          const pair = `${a}-${b}`
          if (!p || !q || Math.hypot(p.x - q.x, p.y - q.y) > NEAR_MISS) {
            touching.delete(pair)
            continue
          }
          if (touching.has(pair)) continue
          touching.add(pair)
          // the hole always tears open at the centre of the system, not at the
          // point of contact — the pair then fall in from wherever they met
          const [x, y] = CENTRE
          setParties((open) => [...open, { id: now, x, y }])
          onHit.current(a, b, x, y)
        }
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [svg, planets, airborneAt, onHit])

  const clear = (id: number) => setParties((open) => open.filter((p) => p.id !== id))
  return { parties, clear }
}

const COLLAPSE = 2.2 // whole event: hole opens, eats, evaporates
const HORIZON = 8 // event-horizon radius, viewBox units

// two planets stray into the same bit of sky, a hole opens between them, drags
// them past the horizon and then evaporates with them inside
function Party({ at, onDone }: { at: Party; onDone: () => void }) {
  // fractions of COLLAPSE: hole open → planets swallowed → evaporation
  const OPEN = 0.12
  const EATEN = SUCK_S / COLLAPSE

  return (
    <m.g
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: COLLAPSE, times: [0, 0.92, 1] }}
      onAnimationComplete={onDone}
      transform={`translate(${at.x} ${at.y})`}
    >
      {/* lensed light: the sky behind the hole smeared into a halo */}
      <m.circle
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.35"
        animate={{ r: [0, HORIZON * 3.4, HORIZON * 2.6, 0], opacity: [0, 0.3, 0.16, 0] }}
        transition={{ duration: COLLAPSE, times: [0, OPEN, 0.92, 1], ease: 'easeOut' }}
      />

      {/* accretion disc, tilted and drawn edge-on-ish; the dashes are infalling
          matter, so they run round the rim faster as the hole feeds */}
      <m.g
        transform="rotate(-20)"
        animate={{ opacity: [0, 0.95, 0.7, 0], scale: [0.3, 1, 1.05, 0] }}
        transition={{ duration: COLLAPSE, times: [0, OPEN, EATEN, 1], ease: 'easeOut' }}
      >
        <m.ellipse
          rx={HORIZON * 2.2}
          ry={HORIZON * 0.62}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeDasharray="5 3"
          animate={{ strokeDashoffset: [0, -64] }}
          transition={{ duration: COLLAPSE, ease: 'easeIn' }}
        />
        <ellipse
          rx={HORIZON * 1.55}
          ry={HORIZON * 0.44}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.6"
          opacity="0.5"
        />
      </m.g>

      {/* debris off the impact: thrown clear, then reeled back in on a spiral */}
      <m.g
        animate={{ rotate: [0, 200] }}
        transition={{ duration: COLLAPSE, ease: 'easeIn' }}
      >
        {DEBRIS.map((angle, i) => (
          <m.circle
            key={i}
            fill="var(--accent)"
            animate={{
              cx: [0, 0, Math.cos(angle) * 24, 0],
              cy: [0, 0, Math.sin(angle) * 24, 0],
              r: [0, 1.4, 1.1, 0],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: COLLAPSE,
              times: [0, EATEN, EATEN + 0.12, 0.9],
              ease: 'easeIn',
            }}
          />
        ))}
      </m.g>

      {/* photon ring — the last light that still gets out */}
      <m.circle
        fill="none"
        stroke="var(--accent)"
        animate={{
          r: [0, HORIZON * 1.12, HORIZON * 1.12, 0],
          strokeWidth: [0, 0.9, 1.6, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: COLLAPSE, times: [0, OPEN, EATEN, 1], ease: 'easeOut' }}
      />

      {/* the horizon: nothing comes back out of this bit */}
      <m.circle
        fill="var(--bg)"
        animate={{ r: [0, HORIZON, HORIZON, 0] }}
        transition={{ duration: COLLAPSE, times: [0, OPEN, 0.92, 1], ease: 'easeOut' }}
      />
    </m.g>
  )
}

function FlightPath() {
  const svgRef = useRef<SVGSVGElement>(null)
  const planets = useRef<(SVGGElement | null)[]>([])
  const [fleet, setFleet] = useState(() =>
    PLANETS.map((_, i) => newPlanet(i, i * STAGGER)),
  )

  const setStatus = (crew: number[], status: 'fly' | 'sucked' | 'gone') =>
    setFleet((f) => f.map((p, i) => (crew.includes(i) ? { ...p, status } : p)))

  const swallow = useRef((a: number, b: number, x: number, y: number) => {
    planets.current[a] = planets.current[b] = null // out of the collision check at once
    setFleet((f) =>
      f.map((p, i) => (i === a || i === b ? { ...p, status: 'sucked' as const, hole: [x, y] } : p)),
    )
    setTimeout(() => setStatus([a, b], 'gone'), SUCK_S * 1000)
    setTimeout(
      () =>
        setFleet((f) =>
          // b waits a beat so the pair cannot reform on top of each other and go again
          f.map((p, i) =>
            i === a || i === b ? { ...newPlanet(i, i === b ? STAGGER : 0), gen: p.gen + 1 } : p,
          ),
        ),
      (SUCK_S + RESPAWN_S) * 1000,
    )
  })

  // in the air only once the entry delay and fade-in are done
  const airborneAt = useRef<number[]>([])
  useEffect(() => {
    airborneAt.current = fleet.map((p) => p.bornAt + (p.delay + 1) * 1000)
  }, [fleet])

  const { parties, clear } = useNearMisses(svgRef, planets, airborneAt, swallow)

  return (
    <div
      style={{ '--reveal-delay': '480ms' } as CSSProperties}
      className="theme-fade relative -mb-4 w-full max-w-3xl"
    >
      <svg ref={svgRef} viewBox="0 0 400 180" className="pointer-events-none h-28 w-full sm:h-36">
        <defs>
          <linearGradient id="trail-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {fleet.map((planet, i) => (
          <m.path
            key={`track-${i}`}
            d={lanePath(planet.lane)}
            fill="none"
            stroke="url(#trail-fade)"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
          />
        ))}

        {/* the sun everything is falling around */}
        <m.circle
          cx={CENTRE[0]}
          cy={CENTRE[1]}
          fill="var(--accent)"
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: 5, opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
        <m.circle
          cx={CENTRE[0]}
          cy={CENTRE[1]}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.5"
          animate={{ r: [7, 10, 7], opacity: [0.35, 0.1, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {fleet.map((planet, i) =>
          planet.status === 'gone' ? null : (
            <m.g
              key={`${i}-${planet.gen}`}
              ref={(el: SVGGElement | null) => {
                planets.current[i] = el
              }}
              initial={{
                opacity: 0,
                x: laneFlight(planet.lane).x[0],
                y: laneFlight(planet.lane).y[0],
              }}
              whileInView={
                // caught: drop the orbit and fall straight at the hole
                planet.hole
                  ? { x: planet.hole[0], y: planet.hole[1], opacity: 1 }
                  : { ...laneFlight(planet.lane), opacity: 0.9 }
              }
              transition={
                planet.hole
                  ? { duration: SUCK_S, ease: [0.5, 0, 1, 1] }
                  : {
                      default: {
                        duration: planet.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: planet.delay,
                      },
                      opacity: { duration: 0.6, delay: planet.delay },
                    }
              }
            >
              <m.g
                animate={
                  planet.status === 'sucked'
                    ? // spaghettified: stretched along the fall, wrung out, gone
                      { scaleX: [1, 1.9, 0], scaleY: [1, 0.25, 0], rotate: 620, opacity: [1, 1, 0] }
                    : {}
                }
                transition={{ duration: SUCK_S, ease: 'easeIn' }}
              >
                {planet.ring && (
                  <ellipse
                    transform="rotate(-18)"
                    rx={planet.r * 1.9}
                    ry={planet.r * 0.5}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="0.9"
                    opacity="0.55"
                  />
                )}
                <circle r={planet.r} fill="var(--accent)" />
                {/* terminator: the half turned away from the sun */}
                <path
                  d={`M0 ${-planet.r}A${planet.r} ${planet.r} 0 0 1 0 ${planet.r}Z`}
                  fill="var(--bg)"
                  opacity="0.3"
                />
              </m.g>
            </m.g>
          ),
        )}

        {parties.map((party) => (
          <Party key={party.id} at={party} onDone={() => clear(party.id)} />
        ))}
      </svg>

      <a
        href="#experience"
        className="mx-auto mt-1 block w-fit text-xs sm:-mt-4 text-[var(--ink-soft)] underline decoration-[var(--ink-soft)]/40 underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
      >
        Experience ↓
      </a>
    </div>
  )
}
