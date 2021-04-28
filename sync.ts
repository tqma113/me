import { syncClient } from './syncClient'

const port = Number(process.env.NODE_PORT)

if (port && !isNaN(port)) {
  syncClient(port)
} else {
  console.log(`port: ${port} is invalid`)
}
