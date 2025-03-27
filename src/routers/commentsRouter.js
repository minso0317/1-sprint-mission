import express from "express";
import { withAsync } from "../middlewares/withAsync.js";
import {
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
import auth from "../middlewares/auth.js";

const commentsRouter = express.Router();

commentsRouter.patch("/:id", auth.verifyAccessToken, withAsync(updateComment));
commentsRouter.delete("/:id", auth.verifyAccessToken, withAsync(deleteComment));

export default commentsRouter;
