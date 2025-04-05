import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticate } from '../middlewares/authenticate';
import {
  createComment,
  createProduct,
  deleteProduct,
  getPorduct,
  getProductList,
  updateProduct,
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/', authenticate(), withAsync(createProduct));
productRouter.get('/:id', authenticate({ optional: true }), withAsync(getPorduct));
productRouter.patch('/:id', authenticate(), withAsync(updateProduct));
productRouter.delete('/:id', authenticate(), withAsync(deleteProduct));
productRouter.get('/', authenticate({ optional: true }), withAsync(getProductList));
productRouter.post('/:id/comments', authenticate(), withAsync(createComment));

export default productRouter;
