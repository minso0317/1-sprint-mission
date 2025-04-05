import { ParamsDTO } from '../DTO/commonDTO';
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from '../DTO/productDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import {
  createProduct,
  deleteProduct,
  getById,
  getProduct,
  updateProduct,
} from '../repositories/productRepository';

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

export async function getProductService(id: number): Promise<GetProductDTO> {
  const product = await getById(id);

  if (!product) {
    throw new NotFoundError('product', id);
  }

  return product;
}

export async function updateProductService(
  id: number,
  data: UpdateProductDTO,
): Promise<UpdateProductDTO> {
  const existingProduct = await getById(id);

  if (!existingProduct) {
    throw new NotFoundError('product', id);
  }

  return await updateProduct(id, data);
}

export async function deleteProductService(id: number) {
  const product = await getById(id);

  if (!product) {
    throw new NotFoundError('product', id);
  }

  return await deleteProduct(id);
}

export async function getProductListService({
  page,
  pageSize,
  orderBy,
  keyword,
}: ParamsDTO): Promise<GetProductDTO[]> {
  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : undefined;

  const products = await getProduct({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
    where,
  });

  return products;
}
