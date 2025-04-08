import { Favorite, Product } from '@prisma/client';
import { GetProductDTO } from './productDTO';

interface ProductFavorites extends Product {
  favorites: Favorite[];
}

export const favoriteProductDTO = (product: ProductFavorites, userId?: number): GetProductDTO => {
  return {
    ...product,
    favoriteCount: product.favorites.length,
    isFavorited: userId
      ? product.favorites.some((favorite) => favorite.userId === userId)
      : undefined,
  };
};
