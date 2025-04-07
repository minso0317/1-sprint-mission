import { Prisma } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import Article from '../types/article';
import { ParamsDTO } from '../DTO/commonDTO';

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

export async function updateArticle(id: number, data: Prisma.ArticleUpdateInput): Promise<Article> {
  return await prismaClient.article.update({
    where: { id },
    data,
  });
}

export async function deleteArticle(id: number): Promise<Article> {
  return await prismaClient.article.delete({
    where: { id },
  });
}

export async function getArticles(args: {
  skip: number;
  take: number;
  orderBy: Prisma.ArticleOrderByWithRelationInput;
  where: Prisma.ArticleWhereInput;
}): Promise<Article[]> {
  return await prismaClient.article.findMany({ ...args });
}
