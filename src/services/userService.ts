import { getById, updateMe } from '../repositories/userRepository';
import { UserWithoutPassword } from '../types/user';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import { passwordDTO, updateUserDTO } from '../DTO/userDTO';
import bcrypt from 'bcrypt';

export async function getMeService(userId: number): Promise<UserWithoutPassword> {
  const user = await getById(userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function updateMeService(userId: number, data: updateUserDTO) {
  const user = await getById(userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const updatedUser = await updateMe(userId, data);
  const { password: _, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
}

export async function updateMyPasswordService(
  userId: number,
  password: string,
  newPassword: string,
) {
  const user = await getById(userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await updateMe(userId, { password: hashedPassword });
}
