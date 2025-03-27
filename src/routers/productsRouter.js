import express from "express";
import { withAsync } from "../middlewares/withAsync.js";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductList,
  createComment,
  getCommentList,
} from "../controllers/productsController.js";
import auth from "../middlewares/auth.js";

const productsRouter = express.Router();

productsRouter.post("/", auth.verifyAccessToken, withAsync(createProduct));
productsRouter.get("/:id", withAsync(getProduct));
productsRouter.patch("/:id", auth.verifyAccessToken, withAsync(updateProduct));
productsRouter.delete("/:id", auth.verifyAccessToken, withAsync(deleteProduct));
productsRouter.get("/", withAsync(getProductList));
productsRouter.post(
  "/:id/comments",
  auth.verifyAccessToken,
  withAsync(createComment)
);
productsRouter.get("/:id/comments", withAsync(getCommentList));

export default productsRouter;
