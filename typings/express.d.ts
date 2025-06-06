import Express from 'express';
import { User } from '@prisma/client';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
