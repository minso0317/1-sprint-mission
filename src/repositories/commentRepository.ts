import { Comment } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import {
  CreateArticleCommentDTO,
  CreateProductCommentDTO,
  GetProductCommentDTO,
} from '../DTO/commentDTO';

export async function createProductComment({
  productId,
  content,
  userId,
}: CreateProductCommentDTO): Promise<Comment> {
  return prismaClient.comment.create({
    data: {
      productId,
      content,
      userId,
    },
  });
}

export async function getProductComment(
  productId: number,
  cursor?: number,
  limit: number = 10,
): Promise<Comment[]> {
  return prismaClient.comment.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: { productId },
  });
}

export async function createArticleComment({
  articleId,
  content,
  userId,
}: CreateArticleCommentDTO): Promise<Comment> {
  return prismaClient.comment.create({
    data: {
      articleId,
      content,
      userId,
    },
  });
}

export async function getArticleComment(
  articleId: number,
  cursor?: number,
  limit: number = 10,
): Promise<Comment[]> {
  return prismaClient.comment.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: limit + 1,
    where: { articleId },
  });
}
