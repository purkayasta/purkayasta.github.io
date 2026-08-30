import type { CSSProperties } from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'
import { AccentSwitch } from './components/AccentSwitch'
import { AirplaneWindow } from './components/AirplaneWindow'
import { Timeline } from './components/Timeline'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Writing } from './components/Writing'
import { Interests } from './components/Interests'
import { Contact } from './components/Contact'
import { SectionIndex } from './components/SectionIndex'
import { useReveal } from './hooks/useReveal'

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties

function App() {
  useReveal()

  return (
    <LazyMotion features={domAnimation} strict>
      <main>
        <AccentSwitch />
        <SectionIndex />
        <AirplaneWindow />
        <div className="theme-fade" style={delay(600)}>
          <Timeline />
        </div>
        <div className="theme-fade" style={delay(720)}>
          <Skills />
        </div>
        <div className="theme-fade" style={delay(840)}>
          <Projects />
        </div>
        <div className="theme-fade" style={delay(960)}>
          <Writing />
        </div>
        <div className="theme-fade" style={delay(1080)}>
          <Interests />
        </div>
        <div className="theme-fade" style={delay(1200)}>
          <Contact />
        </div>
      </main>
    </LazyMotion>
  )
}

export default App
