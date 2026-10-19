import { useEffect, useState } from 'react'

type Health = { status: 'ok' }

function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`)
        return res.json() as Promise<Health>
      })
      .then(setHealth)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  return (
    <main>
      <h1>Project template</h1>
      <p>
        API status: {error ? <strong>{error}</strong> : (health?.status ?? 'loading…')}
      </p>
    </main>
  )
}

export default App
