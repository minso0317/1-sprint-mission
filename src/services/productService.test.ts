import {
  createCommentService,
  createProductService,
  deleteProductService,
  getProductCommentService,
  getProductListService,
  getProductService,
  updateProductService,
} from './productService';
import NotFoundError from '../lib/errors/NotFoundError';
import {
  createProduct,
  deleteProduct,
  getById,
  getProduct,
  updateProduct,
} from '../repositories/productRepository';
import { getFavoriteList } from '../repositories/favoriteRepository';
import { createNotification } from './notificationService';
import { sendNotification } from './SocketService';
import { createProductComment, getProductComment } from '../repositories/commentRepository';

jest.mock('../repositories/productRepository');
jest.mock('../repositories/favoriteRepository');
jest.mock('../repositories/commentRepository');
jest.mock('../services/notificationService');
jest.mock('../services/SocketService');

describe('Product Service', () => {
  afterEach(() => jest.clearAllMocks());

  test('createProductService - should create product with user', async () => {
    const mockProduct = { id: 1, name: 'Test' };
    (createProduct as jest.Mock).mockResolvedValue(mockProduct);

    const result = await createProductService({ name: 'Test' } as any, 123);
    expect(result).toEqual(mockProduct);
    expect(createProduct).toHaveBeenCalled();
  });

  test('getProductService - should return product with favorite info', async () => {
    const product = { id: 1, favorites: [{ userId: 123 }] } as any;
    (getById as jest.Mock).mockResolvedValue(product);

    const result = await getProductService(1, 123);
    expect(result.favoriteCount).toBe(1);
    expect(result.isFavorited).toBe(true);
  });

  test('getProductService - throws if product not found', async () => {
    (getById as jest.Mock).mockResolvedValue(null);
    await expect(getProductService(999)).rejects.toThrow(NotFoundError);
  });

  test('updateProductService - triggers notifications if price changed', async () => {
    const oldProduct = { id: 1, price: 10000, name: 'Old' };
    const updatedProduct = { id: 1, price: 20000, name: 'Old' };
    const favorites = [{ userId: 10 }];

    (getById as jest.Mock).mockResolvedValue(oldProduct);
    (updateProduct as jest.Mock).mockResolvedValue(updatedProduct);
    (getFavoriteList as jest.Mock).mockResolvedValue(favorites);

    await updateProductService(1, { price: 20000 } as any);

    expect(createNotification).toHaveBeenCalled();
    expect(sendNotification).toHaveBeenCalled();
  });

  test('deleteProductService - should delete product if exists', async () => {
    (getById as jest.Mock).mockResolvedValue({ id: 1 });
    (deleteProduct as jest.Mock).mockResolvedValue({});

    await expect(deleteProductService(1)).resolves.not.toThrow();
  });

  test('getProductListService - returns product list', async () => {
    (getProduct as jest.Mock).mockResolvedValue([{ id: 1, favorites: [] }]);
    const result = await getProductListService({ page: 1, pageSize: 10 } as any);
    expect(result.length).toBe(1);
  });

  test('createCommentService - should create comment for existing product', async () => {
    (getById as jest.Mock).mockResolvedValue({ id: 1 });
    (createProductComment as jest.Mock).mockResolvedValue({
      id: 1,
      productId: 1,
      content: 'comment',
      userId: 2,
    });

    const result = await createCommentService({
      id: 1,
      productId: 1,
      content: 'comment',
      userId: 2,
    });

    expect(result.content).toBe('comment');
  });

  test('getProductCommentService - returns paginated comments', async () => {
    const mockComments = [
      { id: 1, content: 'a' },
      { id: 2, content: 'b' },
    ];

    (getById as jest.Mock).mockResolvedValue({ id: 1 });
    (getProductComment as jest.Mock).mockResolvedValue(mockComments);

    const result = await getProductCommentService({ productId: 1, limit: 1 });
    expect(result.comments.length).toBe(1);
    expect(result.nextCursor).toBe(1);
  });
});
