import { FastifyReply, FastifyRequest } from 'fastify'
import { InputCreateUserDTO } from '@/application/use-cases/user/create-user/CreateUserDTO'
import { CreateUserUseCase } from '@/application/use-cases/user/create-user/CreateUserUseCase'
import { UserRepository } from '../../repository/UserRepository'

export class CreateUserController {
  static async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Response> {
    const { name, email, password } = request.body as InputCreateUserDTO

    try {
      const userRepository = new UserRepository()
      const createUserUseCase = new CreateUserUseCase(userRepository)

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send(user)
    } catch (error) {
      return reply.status(400).send({
        message: error.message || 'Unexpected error.',
      })
    }
  }
}
