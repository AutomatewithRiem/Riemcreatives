import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'
import { onRequest } from '../functions/api/visits.js'

function fixture() {
  const db = new DatabaseSync(':memory:')
  db.exec(readFileSync(new URL('../database/visits-schema.sql', import.meta.url), 'utf8'))
  const binding = {
    prepare(sql) {
      return { sql, args: [], bind(...args) { this.args = args; return this }, async first() { return db.prepare(sql).get(...this.args) } }
    },
    async batch(statements) {
      db.exec('BEGIN')
      try {
        const results = statements.map(s => ({ results: s.sql.startsWith('SELECT') ? db.prepare(s.sql).all(...s.args) : (db.prepare(s.sql).run(...s.args), []) }))
        db.exec('COMMIT')
        return results
      } catch (error) { db.exec('ROLLBACK'); throw error }
    },
  }
  return { db, env: { VISITS_DB: binding } }
}
const origin = 'https://riemcreatives.pages.dev'
const post = (id, from = origin) => new Request(`${origin}/api/visits`, { method: 'POST', headers: { Origin: from, 'Content-Type': 'application/json' }, body: JSON.stringify({ visitId: id }) })
const read = () => new Request(`${origin}/api/visits`)

test('fresh sessions count once; reload/retry and read do not add', async () => {
  const { db, env } = fixture()
  const id = crypto.randomUUID()
  for (const [request, expected] of [[read(), 0], [post(id), 1], [post(id), 1], [post(crypto.randomUUID()), 2], [read(), 2]]) {
    const r = await onRequest({ request, env })
    assert.equal(r.status, 200)
    assert.equal((await r.json()).visits, expected)
    assert.equal(r.headers.get('Cache-Control'), 'no-store')
  }
  db.close()
})
test('rejected requests leave total unchanged', async () => {
  const { db, env } = fixture()
  assert.equal((await onRequest({ request: post(crypto.randomUUID(), 'https://other.test'), env })).status, 403)
  assert.equal((await onRequest({ request: post('invalid'), env })).status, 400)
  assert.equal((await onRequest({ request: new Request(`${origin}/api/visits`, { method: 'DELETE' }), env })).status, 405)
  assert.equal((await onRequest({ request: post('x'.repeat(200)), env })).status, 413)
  assert.equal((await (await onRequest({ request: read(), env })).json()).visits, 0)
  db.close()
})
test('missing binding and missing total fail closed, without a fake zero', async () => {
  assert.equal((await onRequest({ request: read(), env: {} })).status, 503)
  const { db, env } = fixture()
  db.exec('DELETE FROM visit_total')
  assert.equal((await onRequest({ request: read(), env })).status, 503)
  db.close()
})
test('database failure rolls back the event claim so retry remains possible', async () => {
  const { db, env } = fixture()
  db.exec("CREATE TRIGGER fail_update BEFORE UPDATE ON visit_total BEGIN SELECT RAISE(ABORT, 'unavailable'); END;")
  const id = crypto.randomUUID()
  assert.equal((await onRequest({ request: post(id), env })).status, 503)
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM visit_sessions').get().n, 0)
  db.exec('DROP TRIGGER fail_update')
  assert.equal((await (await onRequest({ request: post(id), env })).json()).visits, 1)
  db.close()
})
