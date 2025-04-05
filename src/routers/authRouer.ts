import express from 'express';
import { withAsync } from '../lib/withAsync';
import { createUser, loginUser, logoutUser } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/register', withAsync(createUser));
authRouter.post('/login', withAsync(loginUser));
authRouter.post('/logout', withAsync(logoutUser));

export default authRouter;
