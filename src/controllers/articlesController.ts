import { create } from 'superstruct';
import { UnauthorizedError } from 'express-jwt';
import { CreateArticleBodyStruct, UpdateArticleBodyStruct } from '../structs/articlesStructs';
import { request, Request, Response } from 'express';
import {
  createArticleService,
  getArticleService,
  updateArticleService,
} from '../services/articlesService';
import { IdParamsStruct } from '../structs/commonStructs';
import ForbiddenError from '../lib/errors/ForbiddenError';

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('credentials_required', { message: 'Unauthorized' });
  }
  const data = create(req.body, CreateArticleBodyStruct);

  const article = await createArticleService(data, req.user.id);

  res.status(201).json(article);
};

export const getArticle = async (req: Request, res: Response): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);

  const article = await getArticleService(id);

  res.status(200).json(article);
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('credentials_required', { message: 'Unauthorized' });
  }

  const { id } = create(req.params, IdParamsStruct);
  const data = create(req.body, UpdateArticleBodyStruct);
  const article = await getArticleService(id);

  if (article.userId !== req.user.id) {
    throw new ForbiddenError('Should be the owner of the article');
  }

  const updatedArticle = await updateArticleService(id, data);

  res.status(200).json(updatedArticle);
};
