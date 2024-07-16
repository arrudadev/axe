import { Password } from '@/domain/shared/service/password/Password'
import { uuid } from '@/domain/shared/service/uuid/uuid'
import { User } from '../entity/User'

export class UserFactory {
  static async create(name: string, email: string, password: string) {
    const id = uuid()
    const passwordHash = await Password.hash(password)
    const role = 'USER'

    return new User(id, name, email, passwordHash, role)
  }
}
