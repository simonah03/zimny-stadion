import express, { type ErrorRequestHandler } from 'express'

// The app is built separately from server.ts so tests can call it without opening a port.
export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  // Anything under /api that no route handled.
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  app.use(errorHandler)
  return app
}

// Last middleware: turns thrown errors into JSON and never sends the stack trace to the client.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof err?.status === 'number' ? err.status : 500
  if (status >= 500) console.error(err)
  res.status(status).json({ error: status >= 500 ? 'Internal server error' : err.message })
}
