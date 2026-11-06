import { useEffect, useState } from 'react'

type Health = { status: 'ok' }
type OpeningHour = { day: string; opens: string; closes: string }

function App() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hours, setHours] = useState<OpeningHour[] | null>(null)
  const [hoursFailed, setHoursFailed] = useState(false)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`)
        return res.json() as Promise<Health>
      })
      .then(setHealth)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  useEffect(() => {
    fetch('/api/opening-hours')
      .then((res) => {
        if (!res.ok) throw new Error(`API responded with ${res.status}`)
        return res.json() as Promise<{ openingHours: OpeningHour[] }>
      })
      .then((data) => setHours(data.openingHours))
      .catch(() => setHoursFailed(true))
  }, [])

  return (
    <main>
      <h1>Project template</h1>
      <p>
        API status: {error ? <strong>{error}</strong> : (health?.status ?? 'loading…')}
      </p>

      <h2>Opening hours</h2>
      {hoursFailed ? (
        <p>Opening hours are not available right now.</p>
      ) : hours === null ? (
        <p>loading…</p>
      ) : (
        <ul>
          {hours.map((h) => (
            <li key={h.day}>
              {h.day}: {h.opens}–{h.closes}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App