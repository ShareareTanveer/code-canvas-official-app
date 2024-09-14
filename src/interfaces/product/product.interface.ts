import { ITagResponse } from 'tag/tag.interface';
import { IProductImageResponse } from './product-image.interface';
import { IProductCategoryResponse } from './productCategory';
import { ICreatePriceOption, ISimplePriceOptionResponse, IUpdatePriceOption } from './priceOption.interface';

export interface IProductResponse {
  id?: number;
  productCategory: IProductCategoryResponse;
  title: string;
  subtitle: string;
  slug: string;
  live_link: string; 
  priceOptions: ISimplePriceOptionResponse[];
  images?: IProductImageResponse[];
  tags: ITagResponse[];
  featuredImage: string;
}

export interface IProductDetailResponse {
  id?: number;
  productCategory: IProductCategoryResponse;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link: string;
  priceOptions: ISimplePriceOptionResponse[];
  is_documented: boolean;
  images?: IProductImageResponse[];
  tags?: ITagResponse[];
  featuredImage: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICreateProduct {
  productCategory: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link?: string;
  priceOptions: ICreatePriceOption[];
  is_documented?: boolean;
  images?: Express.Multer.File[];
  tags?: number[];
  featuredImage: string;
}

export interface IUpdateProduct {
  productCategory?: number;
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  live_link?: string;
  is_documented?: boolean;
  addImages?: Express.Multer.File[];
  deleteImages?: number[];
  tags?: number[];
  featuredImage: string;

  deletePriceOptions?: number[];
  addPriceOptions?: IUpdatePriceOption[];
}
