import { useCallback, useEffect, useState } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const setDarkWithDelay = useCallback((dark: boolean, delayMs: number) => {
    window.setTimeout(() => setIsDark(dark), delayMs)
  }, [])

  return { isDark, setDarkWithDelay }
}
