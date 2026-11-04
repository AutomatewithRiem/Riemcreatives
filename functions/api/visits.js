const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
const reply = (body, status = 200) => Response.json(body, { status, headers })

// D1's batch is transactional; a retry of the same visit cannot add twice.
export async function onRequest({ request, env }) {
  if (!env.VISITS_DB) return reply({ error: 'Counter unavailable' }, 503)
  if (!['GET', 'POST'].includes(request.method)) return reply({ error: 'Method not allowed' }, 405)
  try {
    if (request.method === 'GET') {
      const row = await env.VISITS_DB.prepare('SELECT total FROM visit_total WHERE id = 1').first()
      if (!row || !Number.isSafeInteger(row.total) || row.total < 0) throw new Error('Invalid counter')
      return reply({ visits: row.total })
    }
    if (request.headers.get('Origin') !== new URL(request.url).origin) return reply({ error: 'Invalid origin' }, 403)
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({ error: 'Expected JSON' }, 415)
    if (Number(request.headers.get('Content-Length')) > 128) return reply({ error: 'Request too large' }, 413)
    const body = await request.text()
    if (body.length > 128) return reply({ error: 'Request too large' }, 413)
    let visitId
    try { visitId = JSON.parse(body).visitId } catch { return reply({ error: 'Invalid visit' }, 400) }
    if (typeof visitId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitId)) return reply({ error: 'Invalid visit' }, 400)
    const results = await env.VISITS_DB.batch([
      env.VISITS_DB.prepare('INSERT OR IGNORE INTO visit_sessions (id) VALUES (?)').bind(visitId),
      env.VISITS_DB.prepare('UPDATE visit_total SET total = total + changes() WHERE id = 1'),
      env.VISITS_DB.prepare('SELECT total FROM visit_total WHERE id = 1'),
    ])
    return reply({ visits: results[2].results[0].total })
  } catch {
    return reply({ error: 'Counter unavailable' }, 503)
  }
}
