import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  createArticle,
  deleteArticle,
  getArticleList,
  getArticleDetail,
  updateArticle,
} from '../controllers/articlesController';
import { authenticate } from '../middlewares/authenticate';

const articleRoute = express.Router();

articleRoute.post('/', authenticate(), withAsync(createArticle));
articleRoute.get('/:id', authenticate({ optional: true }), withAsync(getArticleDetail));
articleRoute.patch('/:id', authenticate(), withAsync(updateArticle));
articleRoute.delete('/:id', authenticate(), withAsync(deleteArticle));
articleRoute.get('/', authenticate({ optional: true }), withAsync(getArticleList));

export default articleRoute;
