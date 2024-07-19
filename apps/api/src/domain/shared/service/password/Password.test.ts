import { describe, it, expect } from 'vitest'
import { PasswordService } from './Password'

describe('Password Service', () => {
  const plainPassword = 'securePassword123'

  it('should hash a password correctly', async () => {
    const hash = await PasswordService.hash(plainPassword)
    expect(hash).toBeDefined()
    expect(hash).not.toBe(plainPassword)
  })

  it('should return true when comparing a valid password and hash', async () => {
    const hash = await PasswordService.hash(plainPassword)
    const isMatch = await PasswordService.compare(plainPassword, hash)
    expect(isMatch).toBe(true)
  })

  it('should return false when comparing an invalid password and hash', async () => {
    const hash = await PasswordService.hash(plainPassword)
    const isMatch = await PasswordService.compare('wrongPassword', hash)
    expect(isMatch).toBe(false)
  })
})
