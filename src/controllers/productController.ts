import { Request, Response } from 'express';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import { createProductService } from '../services/productService';
import { CreateProductBodyStruct } from '../structs/productsStruct';
import { create } from 'superstruct';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }
  const data = create(req.body, CreateProductBodyStruct);

  const product = await createProductService(data, req.user.id);

  res.status(201).json(product);
};
