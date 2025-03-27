import express from "express";
import { withAsync } from "../middlewares/withAsync.js";
import {
  createArticle,
  getArticleList,
  getArticle,
  updateArticle,
  deleteArticle,
  createComment,
  getCommentList,
} from "../controllers/articlesController.js";
import auth from "../middlewares/auth.js";

const articlesRouter = express.Router();

articlesRouter.post("/", auth.verifyAccessToken, withAsync(createArticle));
articlesRouter.get("/", withAsync(getArticleList));
articlesRouter.get("/:id", withAsync(getArticle));
articlesRouter.patch("/:id", auth.verifyAccessToken, withAsync(updateArticle));
articlesRouter.delete("/:id", auth.verifyAccessToken, withAsync(deleteArticle));
articlesRouter.post(
  "/:id/comments",
  auth.verifyAccessToken,
  withAsync(createComment)
);
articlesRouter.get("/:id/comments", withAsync(getCommentList));

export default articlesRouter;
