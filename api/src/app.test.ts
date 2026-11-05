import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from './app.js'

describe('GET /api/health', () => {
  it('reports that the API is up', async () => {
    const res = await request(createApp()).get('/api/health')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })
})

describe('GET /api/opening-hours', () => {
  it('returns opening and closing times for every day of the week', async () => {
    const res = await request(createApp()).get('/api/opening-hours')

    expect(res.status).toBe(200)
    expect(res.body.openingHours).toHaveLength(7)
    for (const entry of res.body.openingHours) {
      expect(entry).toEqual({
        day: expect.any(String),
        opens: expect.stringMatching(/^\d{2}:\d{2}$/),
        closes: expect.stringMatching(/^\d{2}:\d{2}$/),
      })
    }
  })
})

describe('errors', () => {
  it('returns JSON 404 for an unknown API route', async () => {
    const res = await request(createApp()).get('/api/nope')

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'Not found' })
  })

  it('returns JSON 400 without a stack trace for malformed JSON', async () => {
    const res = await request(createApp()).post('/api/health').set('Content-Type', 'application/json').send('{bad')

    expect(res.status).toBe(400)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(JSON.stringify(res.body)).not.toContain('node_modules')
  })
})
