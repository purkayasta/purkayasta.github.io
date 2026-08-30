import { useCallback, useEffect, useState } from 'react'

const FADE_MS = 350

export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [textHidden, setTextHidden] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    document.documentElement.classList.toggle('text-hidden', textHidden)
  }, [textHidden])

  useEffect(() => {
    const id = window.setTimeout(() => setTextHidden(false), 120)
    return () => window.clearTimeout(id)
  }, [])

  const setDarkWithDelay = useCallback((dark: boolean, delayMs: number) => {
    setTextHidden(true)
    const switchAt = Math.max(delayMs, FADE_MS)
    window.setTimeout(() => setIsDark(dark), switchAt)
    window.setTimeout(() => setTextHidden(false), switchAt + FADE_MS)
  }, [])

  return { isDark, setDarkWithDelay }
}
