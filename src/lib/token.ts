import jwt, { Secret } from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from './constants';
import { TokenPair, TokenPayload } from '../types/token';

export function generateTokens(userId: number): Promise<TokenPair> {
  const accessToken = jwt.sign({ id: userId }, JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: '1h',
  });

  return Promise.resolve({ accessToken });
}

export function verifyAccessToken(token: string): { userId: number } {
  const decode = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as Secret) as TokenPayload;
  return { userId: decode.id };
}
