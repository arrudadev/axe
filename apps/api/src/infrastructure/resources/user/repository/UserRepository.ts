import { User } from '@/domain/user/entity/User'
import { IUserRepository } from '@/domain/user/repository/IUserRepository'
import { prisma } from '@/infrastructure/database/prisma'
import { User as PrismaUser } from '@prisma/client'

export class UserRepository implements IUserRepository {
  private serialize(user: PrismaUser) {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    )
  }

  async create(user: User): Promise<User> {
    return await prisma<User>(async (prismaClient) => {
      const createdUser = await prismaClient.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      })

      return this.serialize(createdUser)
    })
  }

  async update(user: User): Promise<User> {
    return await prisma<User>(async (prismaClient) => {
      const updatedUser = await prismaClient.user.update({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        where: {
          id: user.id,
        },
      })

      return this.serialize(updatedUser)
    })
  }

  async delete(id: string): Promise<void> {
    await prisma(async (prismaClient) => {
      await prismaClient.user.delete({
        where: {
          id,
        },
      })
    })
  }

  async findById(id: string): Promise<User> {
    return await prisma<User>(async (prismaClient) => {
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      })

      return this.serialize(user)
    })
  }

  async findAll(): Promise<User[]> {
    return await prisma<User[]>(async (prismaClient) => {
      const users = await prismaClient.user.findMany()

      return users.map((user) => {
        return this.serialize(user)
      })
    })
  }
}
