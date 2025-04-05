import { CreateProductDTO } from '../DTO/productDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import { createProduct, getById } from '../repositories/productRepository';

export async function createProductService(
  data: CreateProductDTO,
  userId: number,
): Promise<CreateProductDTO> {
  const productData = {
    ...data,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  return await createProduct(productData);
}

export async function getProductService(id: number) {
  const product = await getById(id);

  if (!product) {
    throw new NotFoundError('product', id);
  }

  return product;
}
