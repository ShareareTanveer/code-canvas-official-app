import {
  IProductDetailResponse,
  IProductResponse,
} from 'product/product.interface';
import { Product } from '../../../entities/product/product.entity';

export const toIProductResponse = (
  entity: Product,
): IProductResponse => {
  return {
    id: entity.id,
    productCategory: entity.productCategory,
    title: entity.title,
    subtitle: entity.subtitle,
    slug: entity.slug,
    live_link: entity.live_link,
    images: entity.images,
    priceOptions: entity.priceOptions,
    tags: entity.tags,
    featuredImage: entity.featuredImage,
  };
};

export const toIProductDetailResponse = (
  entity: Product,
): IProductDetailResponse => {
  return {
    id: entity.id,
    productCategory: entity.productCategory,
    title: entity.title,
    subtitle: entity.subtitle,
    slug: entity.slug,
    description: entity.description,
    live_link: entity.live_link,
    priceOptions: entity.priceOptions,
    is_documented: entity.is_documented,
    images: entity.images,
    tags: entity.tags,
    featuredImage: entity.featuredImage,
    updatedAt: entity.updatedAt,
    createdAt: entity.createdAt,
  };
};
