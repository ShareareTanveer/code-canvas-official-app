import { ICategoryResponse } from "category/category.interface";
import { IBlogImageResponse } from "./blog-image.interface";

export interface IBlogResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  views?: number;
  isFeatured?: boolean;
  images?: IBlogImageResponse[];
  category?: ICategoryResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBlogDetailResponse {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  content: string;
  isFeatured?: boolean;
  views?: number;
  keyPoints?: string[];
  images?: IBlogImageResponse[];
  category?: ICategoryResponse;
  createdAt?: Date;
  updatedAt?: Date;
  relatedBlogs?: IBlogResponse[];
}

export interface ICreateBlog {
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  content: string;
  isFeatured: boolean;
  images?: Express.Multer.File[];
  keyPoints?: string[];
  category: number;
}

export interface IUpdateBlog {
  title?: string;
  subtitle?: string;
  slug?: string;
  description?: string;
  content?: string;
  keyPoints?: string[];
  addImages?: Express.Multer.File[];
  isFeatured: boolean;
  deleteImages?: number[];
  category?: number;
}