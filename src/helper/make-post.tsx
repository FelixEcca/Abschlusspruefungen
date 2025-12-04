// make-post.tsx

// Optional: für lokalen Test kannst du das auf true setzen,
// dann wird 'http://localhost:8080' als Fallback genutzt,
// falls die Env-Variable fehlt.
const localDev = false

// 👇 AB JETZT: ALLES läuft über das neue Backend
// Priorität: NEXT_PUBLIC_KI_BACKEND_URL (aus .env.local)
// Fallback (nur wenn localDev === true): http://localhost:8080
export const backendHost =
  process.env.NEXT_PUBLIC_KI_BACKEND_URL ||
  (localDev ? 'http://localhost:8080' : '')

export async function makePost(route: string, body: object) {
  if (!backendHost) {
    console.error(
      'backendHost ist leer. Bitte NEXT_PUBLIC_KI_BACKEND_URL in der .env.local setzen.',
    )
    throw new Error('Kein backendHost konfiguriert')
  }

  const res = await fetch(backendHost + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(
      `Request failed: ${res.status} ${res.statusText} (${backendHost + route})`,
    )
  }

  return await res.json()
}
