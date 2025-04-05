import express from 'express';
import { withAsync } from '../lib/withAsync';
import {
  createArticle,
  deleteArticle,
  getArticle,
  updateArticle,
} from '../controllers/articlesController';
import { authenticate } from '../middlewares/authenticate';

const articleRoute = express.Router();

articleRoute.post('/', authenticate(), withAsync(createArticle));
articleRoute.get('/:id', authenticate({ optional: true }), withAsync(getArticle));
articleRoute.patch('/:id', authenticate(), withAsync(updateArticle));
articleRoute.delete('/:id', authenticate(), withAsync(deleteArticle));

export default articleRoute;
