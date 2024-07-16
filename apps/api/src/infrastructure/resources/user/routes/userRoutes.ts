import { FastifyInstance } from 'fastify'
import { CreateUserController } from '../controller/create-user/CreateUserController'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', CreateUserController.handle)
}
