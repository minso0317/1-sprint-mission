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

export async function updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
  return await prismaClient.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: number): Promise<Product> {
  return await prismaClient.product.delete({
    where: { id },
  });
}

export async function getProduct(args: {
  skip: number;
  take: number;
  orderBy: Prisma.ProductOrderByWithRelationInput;
  where: any;
}) {
  return await prismaClient.product.findMany({ ...args });
}
