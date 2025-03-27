import express from "express";
import {
  createUser,
  accessTokenLogin,
  getUserInfo,
} from "../controllers/userController.js";
import { withAsync } from "../middlewares/withAsync.js";

const userRouter = express.Router();

userRouter.post("/users", withAsync(createUser));
userRouter.post("/login", withAsync(accessTokenLogin));

export default userRouter;
