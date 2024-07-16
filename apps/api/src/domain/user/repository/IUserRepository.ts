import { IRepository } from '@/domain/shared/repository/IRepository'
import { User } from '../entity/User'

export interface IUserRepository extends IRepository<User> {}
