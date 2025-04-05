import { CreateArticleDTO, GetArticleDTO, UpdateArticleDTO } from '../DTO/articleDTO';
import { ParamsDTO } from '../DTO/commonDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import {
  createArticle,
  deleteArticle,
  getArticles,
  getById,
  updateArticle,
} from '../repositories/articlesRepository';

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

  return await createArticle(articleData);
};

export const getArticleDetailService = async (id: number): Promise<GetArticleDTO> => {
  const article = await getById(id);

  if (!article) {
    throw new NotFoundError('article', id);
  }

  return article;
};

export const updateArticleService = async (
  id: number,
  data: UpdateArticleDTO,
): Promise<UpdateArticleDTO> => {
  const existingArticle = await getById(id);

  if (!existingArticle) {
    throw new NotFoundError('article', id);
  }

  return await updateArticle(id, data);
};

export const deleteArticleServiec = async (id: number): Promise<void> => {
  const existingArticle = await getById(id);

  if (!existingArticle) {
    throw new NotFoundError('article', id);
  }

  await deleteArticle(id);
};

export const getArticleListService = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: ParamsDTO): Promise<GetArticleDTO[]> => {
  const where = {
    title: keyword ? { contains: keyword } : undefined,
  };

  const articles = await getArticles({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { createdAt: 'desc' } : { id: 'asc' },
    where,
  });

  return articles;
};
