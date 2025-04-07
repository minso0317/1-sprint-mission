import { Request, Response } from 'express';
import { getMeService, updateMeService, updateMyPasswordService } from '../services/userService';
import { create } from 'superstruct';
import { UpdateMeBodyStruct, UpdatePasswordBodyStruct } from '../structs/usersStructs';

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const user = await getMeService(req.user.id);

  res.status(200).json(user);
};

export const updateMe = async (req: Request, res: Response): Promise<void> => {
  const data = create(req.body, UpdateMeBodyStruct);

  const updatedMe = await updateMeService(req.user.id, data);

  res.status(200).json(updateMe);
};

export async function updateMyPassword(req: Request, res: Response): Promise<void> {
  const { password, newPassword } = create(req.body, UpdatePasswordBodyStruct);

  await updateMyPasswordService(req.user.id, password, newPassword);
  res.status(200).json({ message: 'Password change successful' });
}
