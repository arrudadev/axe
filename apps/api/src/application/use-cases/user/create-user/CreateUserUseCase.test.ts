import { describe, it, expect, vi } from 'vitest'
import { IUserRepository } from '@/domain/user/repository/IUserRepository'
import { UserFactory } from '@/domain/user/factory/UserFactory'
import { User } from '@/domain/user/entity/User'
import { CreateUserUseCase } from './CreateUserUseCase'

vi.mock('@/domain/user/factory/UserFactory', () => ({
  UserFactory: {
    create: vi
      .fn()
      .mockImplementation((name, email) =>
        Promise.resolve(
          new User(
            'unique-uuid',
            name,
            email,
            'hashed-password',
            'USER',
            new Date(),
            new Date(),
          ),
        ),
      ),
  },
}))

describe('Create User UseCase', () => {
  const userRepositoryMock: IUserRepository = {
    create: vi.fn().mockImplementation((user) => Promise.resolve(user)),
    update: vi.fn().mockImplementation((user) => Promise.resolve(user)),
    delete: vi.fn().mockImplementation((user) => Promise.resolve(user)),
    findById: vi.fn().mockImplementation((user) => Promise.resolve(user)),
    findAll: vi.fn().mockImplementation((user) => Promise.resolve(user)),
  }

  it('should create a new user and return user data', async () => {
    const inputDTO = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    const useCase = new CreateUserUseCase(userRepositoryMock)
    const result = await useCase.execute(inputDTO)

    expect(result).toEqual({
      id: 'unique-uuid',
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })

    expect(UserFactory.create).toHaveBeenCalledWith(
      inputDTO.name,
      inputDTO.email,
      inputDTO.password,
    )
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1)
  })
})
