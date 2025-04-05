export type OrderByOption = 'recent' | 'oldest' | undefined;

export interface ParamsDTO {
  page: number;
  pageSize: number;
  orderBy?: OrderByOption;
  keyword?: string;
  currentUserId?: number;
}
