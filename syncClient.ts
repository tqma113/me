import { createApiClients } from 'farrow/dist/api-client'

export const syncClient = (port: number) => {
  const client = createApiClients({
    services: [
      {
        src: `http://localhost:${port}/api`,
        dist: `${__dirname}/src/api/model.ts`,
        alias: '/api',
      },
    ],
  })

  return client.sync()
}
