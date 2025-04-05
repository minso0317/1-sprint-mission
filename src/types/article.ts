interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default Article;
