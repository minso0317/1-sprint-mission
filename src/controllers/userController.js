import userService from "../services/userService.js";

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
