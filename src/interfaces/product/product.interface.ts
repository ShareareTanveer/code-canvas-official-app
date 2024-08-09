import { ITagResponse } from 'tag/tag.interface';
import { ICategoryResponse } from '../category/category.interface';
import { IProductImageResponse } from './product-image.interface';
import { IReviewResponse } from 'review/review.interface';

export interface IProductResponse {
  id?: number;
  category: ICategoryResponse;
  title: string;
  slug: string;
  live_link: string;
  price: number;
  images?: IProductImageResponse[];
  total_sale?: number;
}

export interface IProductDetailResponse {
  id?: number;
  category: ICategoryResponse;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link: string;
  support_for: string;
  price: number;
  is_documented: boolean;
  images?: IProductImageResponse[];
  total_sale?: number;
  tags?: ITagResponse[];
  reviews?: IReviewResponse[];
}

export interface ICreateProduct {
  category: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link?: string;
  support_for?: string;
  price: number;
  is_documented?: boolean;
  images?: Express.Multer.File[];
  tags?: number[];
}

export interface IUpdateProduct {
  category?: number;
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  live_link?: string;
  support_for?: string;
  price?: number;
  is_documented?: boolean;
  addImages?: Express.Multer.File[];
  deleteImages?: number[];
  tags?: number[];
}
