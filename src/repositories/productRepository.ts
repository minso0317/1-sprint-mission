import { Prisma, Product } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

export async function createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
  return await prismaClient.product.create({
    data,
  });
}

export async function getById(id: number): Promise<Product | null> {
  return await prismaClient.product.findUnique({
    where: { id },
  });
}
