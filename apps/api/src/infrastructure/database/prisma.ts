import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export async function prisma<T>(
  callback: (prisma: PrismaClient) => Promise<T>,
) {
  try {
    return await callback(prismaClient)
  } finally {
    await prismaClient.$disconnect()
  }
}
