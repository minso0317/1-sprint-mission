import { Request, Response } from 'express';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import { createProductService, getProductService } from '../services/productService';
import { CreateProductBodyStruct } from '../structs/productsStruct';
import { create } from 'superstruct';
import { IdParamsStruct } from '../structs/commonStructs';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }
  const data = create(req.body, CreateProductBodyStruct);

  const product = await createProductService(data, req.user.id);

  res.status(201).json(product);
};

export const getPorduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = create(req.params, IdParamsStruct);

  const product = await getProductService(id);

  res.status(200).json(product);
};
