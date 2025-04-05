import { Article, Prisma } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

export async function createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
  return await prismaClient.article.create({
    data,
  });
}

export async function getById(id: number): Promise<Article | null> {
  return await prismaClient.article.findUnique({
    where: { id },
  });
}

export async function update(id: number, data: Prisma.ArticleUpdateInput): Promise<Article> {
  return await prismaClient.article.update({
    where: { id },
    data,
  });
}
