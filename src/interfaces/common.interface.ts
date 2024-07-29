export interface IDeleteById {
  id: number;
}

export interface IDetailById {
  id: number;
}

export interface IBaseQueryParams {
  keyword?: string;
  pagination?: string;
  limit: number;
  page: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface IOverrideRequest {
  code: number;
  message: string;
  positive: string;
  negative: string;
}

export interface ICookie {
  key: string;
  value: string;
}

export interface IPagination {
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalItems: number;
}
