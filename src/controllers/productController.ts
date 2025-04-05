import { Request, Response } from 'express';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import {
  createProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from '../services/productService';
import { CreateProductBodyStruct, UpdateProductBodyStruct } from '../structs/productsStruct';
import { create } from 'superstruct';
import { IdParamsStruct } from '../structs/commonStructs';
import ForbiddenError from '../lib/errors/ForbiddenError';

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

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id } = create(req.params, IdParamsStruct);
  const { name, description, price, tags, images } = create(req.body, UpdateProductBodyStruct);

  const product = await getProductService(id);

  if (product.userId !== req.user.id) {
    throw new ForbiddenError('Should be the owner of the product');
  }

  const updatedProduct = await updateProductService(id, { name, description, price, tags, images });

  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthorizedError('Unauthorized');
  }

  const { id } = create(req.params, IdParamsStruct);

  const product = await getProductService(id);

  if (product.userId !== req.user.id) {
    throw new ForbiddenError('Should be the owner of the product');
  }

  const deleteProduct = await deleteProductService(id);

  res.status(204).json();
};
