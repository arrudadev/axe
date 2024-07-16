import { FastifyInstance } from 'fastify'
import { userRoutes } from '../resources/user/routes/userRoutes'

export function registryRoutes(fastify: FastifyInstance) {
  fastify.register(userRoutes)
}
