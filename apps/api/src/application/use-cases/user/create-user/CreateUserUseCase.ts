import { IUserRepository } from '@/domain/user/repository/IUserRepository'
import { UserFactory } from '@/domain/user/factory/UserFactory'
import { InputCreateUserDTO, OutputCreateUserDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(inputDTO: InputCreateUserDTO): Promise<OutputCreateUserDTO> {
    const user = await UserFactory.create(
      inputDTO.name,
      inputDTO.email,
      inputDTO.password,
    )

    const createdUser = await this.userRepository.create(user)

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    }
  }
}
