import { Prisma } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { User } from '../types/user';

export async function getById(id: number): Promise<User | null> {
  return await prismaClient.user.findUnique({
    where: { id },
  });
}

export async function updateMe(id: number, data: Prisma.UserUpdateInput): Promise<User> {
  return await prismaClient.user.update({
    where: { id },
    data,
  });
}
