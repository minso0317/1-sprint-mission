import { NextFunction, Request, Response } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME } from '../lib/constants';
import { verifyAccessToken } from '../lib/token';
import { findById } from '../repositories/authRepository';

export function authenticate(options = { optional: false }) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME]; // cook에서 토큰 꺼냄
    if (!accessToken && options.optional) {
      return next();
    }

    if (!accessToken) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const { userId } = verifyAccessToken(accessToken);
      const user = await findById(userId);

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      } // null 일 때 에러메세지를 처리해줘서  user의 undefined와 타입에러 안나게 해준다.

      req.user = user;
      return next();
    } catch (error) {
      if (options.optional) {
        return next();
      }
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  };
}
