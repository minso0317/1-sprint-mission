import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { withAsync } from '../lib/withAsync';
import { getMe, getMyProductList, updateMe, updateMyPassword } from '../controllers/userController';

const usersRouter = express.Router();

usersRouter.get('/me', authenticate(), withAsync(getMe));
usersRouter.patch('/me', authenticate(), withAsync(updateMe));
usersRouter.patch('/me/password', authenticate(), withAsync(updateMyPassword));
usersRouter.get('/me/products', authenticate(), withAsync(getMyProductList));

export default usersRouter;
