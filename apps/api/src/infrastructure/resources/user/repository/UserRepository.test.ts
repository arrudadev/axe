import { describe, it, expect, vi } from 'vitest'
import { UserRepository } from './UserRepository'
import { User } from '@/domain/user/entity/User'

vi.mock('@/infrastructure/database/prisma', () => ({
  prisma: vi.fn().mockImplementation((callback) =>
    callback({
      user: {
        create: vi.fn().mockResolvedValue({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed-password',
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        update: vi.fn().mockResolvedValue({
          id: '1',
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'new-hashed-password',
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        delete: vi.fn().mockResolvedValue({}),
        findUnique: vi.fn().mockResolvedValue({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashed-password',
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        findMany: vi.fn().mockResolvedValue([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed-password',
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      },
    }),
  ),
}))

describe('User Repository', () => {
  const userRepository = new UserRepository()

  it('should create a user', async () => {
    const newUser = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'USER',
    )

    const savedUser = await userRepository.create(newUser)

    expect(savedUser.name).toBe('John Doe')
    expect(savedUser.email).toBe('john@example.com')
    expect(savedUser.password).toBe('hashed-password')
  })

  it('should update a user', async () => {
    const existingUser = new User(
      '1',
      'Jane Doe',
      'jane@example.com',
      'new-password',
      'USER',
    )

    const updatedUser = await userRepository.update(existingUser)

    expect(updatedUser.name).toBe('Jane Doe')
    expect(updatedUser.email).toBe('jane@example.com')
  })

  it('should delete a user', async () => {
    await expect(userRepository.delete('1')).resolves.toBeUndefined()
  })

  it('should find a user by id', async () => {
    const user = await userRepository.findById('1')
    expect(user.name).toBe('John Doe')
  })

  it('should find all users', async () => {
    const users = await userRepository.findAll()
    expect(users.length).toBeGreaterThan(0)
  })
})
