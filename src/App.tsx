import { useState } from 'react'
import { AirplaneWindow } from './components/AirplaneWindow'
import { Timeline } from './components/Timeline'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { useTheme } from './hooks/useTheme'

const SHADE_CLOSE_MS = 1100

function App() {
  const [isOpen, setIsOpen] = useState(true)
  const { setDarkWithDelay } = useTheme()

  const toggleWindow = () => {
    const next = !isOpen
    setIsOpen(next)
    setDarkWithDelay(!next, next ? 0 : SHADE_CLOSE_MS)
  }

  return (
    <main>
      <AirplaneWindow isOpen={isOpen} onToggle={toggleWindow} />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

export default App
