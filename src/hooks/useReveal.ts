import { useEffect, useState } from 'react'

// Staged fade-in on first paint. The page has no light/dark switch — the cabin
// is always dark and the open shade lights the hero locally.
export function useReveal() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('text-hidden', hidden)
  }, [hidden])

  useEffect(() => {
    const id = window.setTimeout(() => setHidden(false), 120)
    return () => window.clearTimeout(id)
  }, [])
}
