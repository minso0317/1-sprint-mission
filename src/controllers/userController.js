import userService from "../services/userService.js";
import { IdParamsStruct } from "../structs/commonStructs.js";
import { create } from "superstruct";

export const createUser = async (req, res) => {
  const user = await userService.createUserService(req.body);
  return res.status(201).json(user);
};

export const accessTokenLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUser(email, password);
  const accessToken = userService.createToken(user);

  return res.json({ accessToken });
};

export const getUserInfo = async (req, res) => {
  const { id } = create(req.params, IdParamsStruct);
  const { data } = req.body;

  const user = await userService.getUserInfoService(id, data);
  return res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { id } = create(req.params, IdParamsStruct);
  const data = req.body;

  const user = await userService.updateUserService(id, data);

  return res.status(200).json(user);
};

export async function updateUserPassword(req, res) {
  const { id } = req.params;
  const { password } = req.body;

  const updatedUser = await userService.updateUserPasswordService(id, password);
  return res.status(200).json(updatedUser);
}
