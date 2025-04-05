import { Comment } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import { CreateArticleCommentDTO, CreateProductCommentDTO } from '../DTO/commentDTO';

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
