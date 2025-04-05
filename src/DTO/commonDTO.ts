import { Comment } from '@prisma/client';

type OrderByOption = 'recent' | 'oldest' | undefined;

export interface ParamsDTO {
  page: number;
  pageSize: number;
  orderBy?: OrderByOption;
  keyword?: string;
  currentUserId?: number;
}

export interface cursorPagenation {
  comments: Comment[];
  nextCursor: number | null;
}
