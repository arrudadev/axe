import { PasswordService } from '@/domain/shared/service/password/Password'
import { UuidService } from '@/domain/shared/service/uuid/Uuid'
import { User } from '../entity/User'

export class UserFactory {
  static async create(name: string, email: string, password: string) {
    const id = UuidService.generate()
    const passwordHash = await PasswordService.hash(password)
    const role = 'USER'

    return new User(id, name, email, passwordHash, role)
  }
}
