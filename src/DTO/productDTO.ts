import Product from '../types/product';

export const productResponseDTO = (product: Product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    tags: product.tags,
    images: product.images,
    comments: product.comments,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}
