// src/helper/make-post.tsx

/**
 * Kleiner Helper zum Aufruf der internen API-Routen.
 *
 * Beispiel: makePost('/va89kjds', body)
 *  -> POST auf /api/va89kjds
 */
export async function makePost(route: string, body: object) {
  const path = route.startsWith('/') ? route : `/${route}`
  const url = `/api${path}` // z.B. "/api/va89kjds"

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as {
      error?: string
      detail?: string
    } | null
    throw new Error(
      payload?.detail ??
        payload?.error ??
        `Request failed with status ${res.status}`,
    )
  }

  return res.json()
}
