import { IBaseQueryParams } from "common.interface";

export interface IProductQueryParams extends IBaseQueryParams {
    keyword?: string;
    category?: string;
    sortBy?: 'title' | 'price';
    sortOrder?: 'ASC' | 'DESC';
  }
  