import { describe, it, expect, vi } from 'vitest'
import { UserFactory } from './UserFactory'

vi.mock('@/domain/shared/service/uuid/Uuid', () => ({
  UuidService: {
    generate: vi.fn().mockReturnValue('unique-uuid'),
  },
}))

vi.mock('@/domain/shared/service/password/Password', () => ({
  PasswordService: {
    hash: vi.fn().mockResolvedValue('hashed-password'),
  },
}))

describe('User Factory', () => {
  it('should create a user with a hashed password and generated UUID', async () => {
    const name = 'John Doe'
    const email = 'john.doe@example.com'
    const password = 'password123'

    const user = await UserFactory.create(name, email, password)

    expect(user.id).toBe('unique-uuid')
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
    expect(user.password).toBe('hashed-password')
    expect(user.role).toBe('USER')
  })
})
