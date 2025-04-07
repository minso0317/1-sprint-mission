import { Comment, Prisma } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import {
  CreateArticleCommentDTO,
  CreateProductCommentDTO,
  GetProductCommentDTO,
  UpdateCommentDTO,
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

export async function updateComment(id: number, data: Prisma.CommentUpdateInput): Promise<Comment> {
  return prismaClient.comment.update({
    where: { id },
    data,
  });
}

export async function getById(id: number): Promise<Comment | null> {
  return prismaClient.comment.findFirst({
    where: { id },
  });
}

export async function deleteComment(id: number): Promise<Comment> {
  return prismaClient.comment.delete({
    where: { id },
  });
}
