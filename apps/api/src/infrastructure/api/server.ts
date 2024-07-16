import Fastify from 'fastify'
import { registryRoutes } from './routes'

const fastify = Fastify({
  logger: true,
})

registryRoutes(fastify)

fastify.listen({ port: 3000 }, function (error, address) {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }

  fastify.log.info(`server listening on ${address}`)
})
