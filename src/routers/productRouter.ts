import express from 'express';
import { withAsync } from '../lib/withAsync';
import { authenticate } from '../middlewares/authenticate';
import { createProduct } from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/', authenticate(), withAsync(createProduct));

export default productRouter;
