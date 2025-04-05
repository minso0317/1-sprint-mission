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

const articleRouter = express.Router();

articleRouter.post('/', authenticate(), withAsync(createArticle));
articleRouter.get('/:id', authenticate({ optional: true }), withAsync(getArticleDetail));
articleRouter.patch('/:id', authenticate(), withAsync(updateArticle));
articleRouter.delete('/:id', authenticate(), withAsync(deleteArticle));
articleRouter.get('/', authenticate({ optional: true }), withAsync(getArticleList));

export default articleRouter;
