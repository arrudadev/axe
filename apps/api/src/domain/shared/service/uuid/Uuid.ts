import { v4 as uuidV4 } from 'uuid'

export class UuidService {
  static generate(): string {
    return uuidV4()
  }
}
