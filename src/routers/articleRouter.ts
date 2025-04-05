import express from 'express';
import { withAsync } from '../lib/withAsync';
import { createArticle, getArticle, updateArticle } from '../controllers/articlesController';
import authenticate from '../middlewares/authenticate';
import { optional } from 'superstruct';

const articleRoute = express.Router();

articleRoute.post('/', authenticate(), withAsync(createArticle));
articleRoute.get('/:id', authenticate({ optional: true }), withAsync(getArticle));
articleRoute.patch('/:id', authenticate(), withAsync(updateArticle));

export default articleRoute;
