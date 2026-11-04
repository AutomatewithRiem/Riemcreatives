import { useEffect, useState } from 'react'

let result: Promise<number> | undefined
function loadVisits() {
  if (!result) result = (async () => {
    let visitId: string | undefined
    try {
      visitId = sessionStorage.getItem('riem-visit-id') || crypto.randomUUID()
      sessionStorage.setItem('riem-visit-id', visitId)
    } catch { visitId = undefined /* Read without counting when browser storage is blocked. */ }
    const response = await fetch('/api/visits', visitId ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitId }),
    } : { cache: 'no-store' })
    if (!response.ok) throw new Error('Counter unavailable')
    const data = await response.json()
    if (!Number.isSafeInteger(data.visits) || data.visits < 0) throw new Error('Invalid total')
    return data.visits as number
  })()
  return result
}

export default function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null)
  useEffect(() => {
    let active = true
    void loadVisits().then(total => { if (active) setVisits(total) }).catch(() => {})
    return () => { active = false }
  }, [])
  return <span className="visit-counter" title="Total counted browser sessions since this counter launched; not unique people.">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
    <span>{visits === null ? 'Visits unavailable' : `${visits.toLocaleString()} ${visits === 1 ? 'visit' : 'visits'}`}</span>
  </span>
}
