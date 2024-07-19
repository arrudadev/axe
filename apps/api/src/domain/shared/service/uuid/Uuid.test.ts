import { describe, it, expect } from 'vitest'
import { UuidService } from './Uuid'

describe('Uuid Service', () => {
  it('should generate a valid UUID', () => {
    const uuid = UuidService.generate()
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })

  it('should generate unique UUIDs on successive calls', () => {
    const uuid1 = UuidService.generate()
    const uuid2 = UuidService.generate()
    expect(uuid1).not.toBe(uuid2)
  })
})
