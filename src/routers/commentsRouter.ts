import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { withAsync } from '../lib/withAsync';
import { updateComment } from '../controllers/commentsController';

const commentsRouter = express.Router();
commentsRouter.patch('/:id', authenticate(), withAsync(updateComment));

export default commentsRouter;
