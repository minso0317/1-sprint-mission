import Article from '../types/article';

export const articleResponseDTO = (article: Article) => {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    image: article.image,
    userId: article.userId,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
};

export interface CreateArticleDTO {
  title: string;
  content: string;
  image: string | null;
}

export interface GetArticleDTO {
  id: number;
  title: string;
  content: string;
  image: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateArticleDTO {
  title?: string;
  content?: string;
  image?: string | null;
}
