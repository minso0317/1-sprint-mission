import { CreateProductCommentDTO } from '../DTO/commentDTO';
import { cursorPagenation, GetProductListDTO, ParamsDTO } from '../DTO/commonDTO';
import { favoriteProductDTO } from '../DTO/favoriteDTO';
import {
  CreateProductDTO,
  GetProductDTO,
  ProductFavoriteDTO,
  UpdateProductDTO,
} from '../DTO/productDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import { createProductComment, getProductComment } from '../repositories/commentRepository';
import { getFavoriteList } from '../repositories/favoriteRepository';
import {
  createProduct,
  deleteProduct,
  getById,
  getProduct,
  updateProduct,
} from '../repositories/productRepository';
import { Product } from '../types/product';
import { createNotification } from './notificationService';
import { sendNotification } from './SocketService';

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

export async function getProductService(
  productId: number,
  userId?: number,
): Promise<ProductFavoriteDTO> {
  const product = await getById(productId);

  if (!product) {
    throw new NotFoundError('product', productId);
  }

  const isFavorited = userId
    ? product.favorites.some((favorite) => favorite.userId === userId)
    : undefined;

  return {
    ...product,
    favoriteCount: product.favorites.length,
    isFavorited,
  };
}

export async function updateProductService(id: number, data: Product): Promise<UpdateProductDTO> {
  const currentProduct = await getById(id);
  const newPrice = data.price;

  if (!currentProduct) throw new NotFoundError('Product', id);

  const priceChanged = currentProduct.price !== newPrice;

  const updatedProduct = await updateProduct(id, data);

  if (priceChanged) {
    const favorites = await getFavoriteList(id);
    await Promise.all(
      favorites.map(async (fav) => {
        const payload = {
          productId: updatedProduct.id,
          productName: updatedProduct.name,
          oldPrice: currentProduct.price,
          newPrice,
        };

        await createNotification({
          userId: fav.userId,
          type: 'PRICE_CHANGED',
          payload,
        });

        sendNotification(fav.userId, payload);
      }),
    );
  }

  return updatedProduct as UpdateProductDTO;
}

export async function deleteProductService(id: number) {
  const product = await getById(id);

  if (!product) {
    throw new NotFoundError('product', id);
  }

  return await deleteProduct(id);
}

export async function getProductListService(
  params: ParamsDTO,
  userId?: number,
): Promise<GetProductDTO[]> {
  const { page, pageSize, orderBy, keyword } = params;

  const where: GetProductListDTO['where'] = keyword
    ? {
        OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
      }
    : {};

  const products = await getProduct({ page, pageSize, orderBy: 'recent', where });

  const productList = products.map((product) => favoriteProductDTO(product, userId));

  return productList;
}

export async function createCommentService({
  id,
  productId,
  content,
  userId,
}: CreateProductCommentDTO): Promise<CreateProductCommentDTO> {
  const existingProduct = await getById(productId);
  if (!existingProduct) {
    throw new NotFoundError('product', productId);
  }

  const comment = await createProductComment({ id, productId, content, userId });

  return {
    id: comment.id,
    productId: comment.productId!,
    content: comment.content,
    userId: comment.userId,
  };
}

export async function getProductCommentService({
  productId,
  cursor,
  limit,
}: {
  productId: number;
  cursor?: number;
  limit: number;
}): Promise<cursorPagenation> {
  const product = await getById(productId);
  if (!product) {
    throw new NotFoundError('product', productId);
  }

  const getComment = await getProductComment(productId, cursor, limit);
  const comments = getComment.slice(0, limit);
  const cursorComment = getComment[comments.length - 1];
  const nextCursor = cursorComment ? cursorComment.id : null;

  return { comments, nextCursor };
}
