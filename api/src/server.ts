import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 3000)

createApp().listen(port, (err) => {
  // Express 5 reports startup errors (e.g. the port is already taken) here.
  if (err) throw err
  console.log(`API listening on http://localhost:${port}`)
})
