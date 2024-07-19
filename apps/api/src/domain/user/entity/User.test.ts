import { describe, it, expect } from 'vitest'
import { User } from './User'

describe('User Entity', () => {
  it('should create a user instance with all properties', () => {
    const createdAt = new Date()
    const updatedAt = new Date()

    const user = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'ADMIN',
      createdAt,
      updatedAt,
    )

    expect(user.id).toBe('1')
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password).toBe('password123')
    expect(user.role).toBe('ADMIN')
    expect(user.isAdmin()).toBe(true)
    expect(user.createdAt).toStrictEqual(createdAt)
    expect(user.updatedAt).toStrictEqual(updatedAt)
  })

  it('should be able to create a user instance without the no required properties', () => {
    const user = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'ADMIN',
    )

    expect(user.id).toBe('1')
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password).toBe('password123')
    expect(user.role).toBe('ADMIN')
    expect(user.isAdmin()).toBe(true)
  })

  it('should allow name to be updated', () => {
    const user = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'USER',
    )

    user.name = 'Jane Doe'

    expect(user.name).toBe('Jane Doe')
  })

  it('should allow email to be updated', () => {
    const user = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'USER',
    )

    user.email = 'jane@example.com'

    expect(user.email).toBe('jane@example.com')
  })

  it('should allow password to be updated', () => {
    const user = new User(
      '1',
      'John Doe',
      'john@example.com',
      'password123',
      'USER',
    )

    user.password = 'password12345'

    expect(user.password).toBe('password12345')
  })

  it('should return true for isAdmin if role is ADMIN', () => {
    const adminUser = new User(
      '2',
      'Admin User',
      'admin@example.com',
      'securePass',
      'ADMIN',
    )

    expect(adminUser.isAdmin()).toBe(true)
  })

  it('should return false for isAdmin if role is USER', () => {
    const normalUser = new User(
      '3',
      'Normal User',
      'user@example.com',
      'securePass',
      'USER',
    )

    expect(normalUser.isAdmin()).toBe(false)
  })
})
