const CACHE = 'pp-v1'
const FONTS = ['fonts.googleapis.com', 'fonts.gstatic.com']

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/', '/favicon.svg'])))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

async function cacheFirst(request) {
  const hit = await caches.match(request)
  if (hit) return hit
  const response = await fetch(request)
  if (response.ok || response.type === 'opaque') {
    const cache = await caches.open(CACHE)
    cache.put(request, response.clone())
  }
  return response
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    const cache = await caches.open(CACHE)
    cache.put(request, response.clone())
    return response
  } catch {
    return (await caches.match(request)) || (await caches.match('/'))
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  const sameOrigin = url.origin === self.location.origin

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
    return
  }

  if ((sameOrigin && url.pathname.startsWith('/assets/')) || FONTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(request))
  }
})
