import { useEffect, useRef, useState } from 'react'

// GitHub's Zen endpoint: short engineering aphorisms, CORS-open, no key, 60 req/hr.
// Checked 2026-08-31. Every line is design/engineering wisdom, so there is no tag
// to filter on — the source is the filter. Its pool is small, hence the dedupe.
const ENDPOINT = 'https://api.github.com/zen'
const MAX_QUOTES = 6
const MAX_CALLS = 14
const POLL_MS = 5000
const ROTATE_MS = 7000

export function useWisdom() {
  const [quotes, setQuotes] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [blocked, setBlocked] = useState(false)
  const calls = useRef(0)

  const done = quotes.length >= MAX_QUOTES

  useEffect(() => {
    if (done || blocked) return
    let cancelled = false

    const load = async () => {
      if (calls.current >= MAX_CALLS) return
      calls.current += 1
      try {
        const res = await fetch(ENDPOINT, { cache: 'no-store' })
        // 403 rate limit / 429 too many requests / 5xx server fault: retrying
        // will not help, so give up and rotate whatever was already collected.
        if (res.status === 403 || res.status === 429 || res.status >= 500) {
          setBlocked(true)
          return
        }
        if (!res.ok) return
        const text = (await res.text()).trim()
        if (cancelled || !text) return
        setQuotes((q) => (q.includes(text) || q.length >= MAX_QUOTES ? q : [...q, text]))
      } catch {
        return // offline or blocked: the caller renders nothing
      }
    }

    load()
    const id = window.setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [done, blocked])

  useEffect(() => {
    if (quotes.length < 2) return
    const id = window.setInterval(() => setIndex((n) => n + 1), ROTATE_MS)
    return () => window.clearInterval(id)
  }, [quotes.length])

  return quotes.length ? quotes[index % quotes.length] : null
}
