import { IProductDetailResponse, IProductResponse } from 'product/product.interface';
import { Product } from '../../../entities/product/product.entity';

export const toIProductResponse = (
  entity: Product,
): IProductResponse => {
  return {
    id: entity.id,
    category: entity.category,
    title: entity.title,
    slug: entity.slug,
    live_link: entity.live_link,
    price: entity.price,
    images: entity.images,
    total_sale: entity.total_sale,
  };
};

export const toIProductDetailResponse = (
  entity: Product,
): IProductDetailResponse => {
  return {
    id: entity.id,
    category: entity.category,
    title: entity.title,
    subtitle: entity.subtitle,
    slug: entity.slug,
    description: entity.description,
    live_link: entity.live_link,
    support_for: entity.support_for,
    price: entity.price,
    is_documented: entity.is_documented,
    images: entity.images,
    total_sale: entity.total_sale,
    tags: entity.tags,
    reviews: entity.reviews,
  };
};
