import { Article, Prisma } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';

async function createArticle(data: Prisma.ArticleCreateInput) {
  return await prismaClient.article.create({
    data,
  });
}

async function getById(id: number) {
  return await prismaClient.article.findUnique({
    where: { id },
  });
}

async function update(id: number, data: Prisma.ArticleUpdateInput) {
  return await prismaClient.article.update({
    where: { id },
    data,
  });
}

export default {
  createArticle,
  getById,
  update,
};
