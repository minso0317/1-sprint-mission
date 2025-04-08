import { Prisma, User } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import Product from '../types/product';

export async function getByUserId(id: number): Promise<User | null> {
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

export async function getMyProductList(
  userId: number,
  page: number,
  pageSize: number,
  orderBy: 'recent' | 'oldest',
  where: Prisma.ProductWhereInput,
): Promise<Product[]> {
  return prismaClient.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
    where: {
      ...where,
      userId,
    },
  });
}
