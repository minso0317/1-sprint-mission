import { CreateArticleDTO, GetArticleDTO, UpdateArticleDTO } from '../DTO/articleDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import articlesRepository from '../repositories/articlesRepository';
import Article from '../types/article';

export const createArticleService = async (
  data: CreateArticleDTO,
  userId: number,
): Promise<CreateArticleDTO> => {
  const articleData = {
    ...data,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  return await articlesRepository.createArticle(articleData);
};

export const getArticleService = async (id: number): Promise<GetArticleDTO> => {
  const article = await articlesRepository.getById(id);

  if (!article) {
    throw new NotFoundError('article', id);
  }

  return article;
};

export const updateArticleService = async (
  id: number,
  data: UpdateArticleDTO,
): Promise<UpdateArticleDTO> => {
  const existingArticle = await articlesRepository.getById(id);

  if (!existingArticle) {
    throw new NotFoundError('article', id);
  }

  return await articlesRepository.update(id, data);
};
