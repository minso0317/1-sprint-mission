import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticate } from '../middlewares/authenticate';
import { createProduct, getPorduct } from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/', authenticate(), withAsync(createProduct));
productRouter.get('/:id', authenticate({ optional: true }), withAsync(getPorduct));

export default productRouter;
