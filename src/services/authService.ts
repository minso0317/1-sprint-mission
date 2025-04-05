import bcrypt from 'bcrypt';
import BadRequestError from '../lib/errors/BadRequestError';
import { CreateUserDTO, LoginUserDTO, userResponseDTO, UserResponseDTO } from '../DTO/userDTO';
import { generateTokens } from '../lib/token';
import { ACCESS_TOKEN_COOKIE_NAME, NODE_ENV } from '../lib/constants';
import { Response } from 'express';
import { findByEmail, save } from '../repositories/authRepository';

export async function register(data: CreateUserDTO): Promise<UserResponseDTO> {
  const password = data.password;
  const email = data.email;
  const nickname = data.nickname;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const isExist = await findByEmail(email);

  if (isExist) {
    throw new BadRequestError('User already exist');
  }

  const user = await save({
    email,
    nickname,
    password: hashedPassword,
  });

  return userResponseDTO(user);
}

export async function login(data: LoginUserDTO, res: Response): Promise<void> {
  const { email, password } = data;

  const user = await findByEmail(email);
  if (!user) {
    throw new BadRequestError('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials');
  }

  const { accessToken } = await generateTokens(user.id);
  setTokenCookies(res, accessToken);
}

export function setTokenCookies(res: Response, accessToken: string): void {
  res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/auth/refresh',
  });
}
