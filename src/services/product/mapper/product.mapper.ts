import { Product } from '../../../entities/product/product.entity';
import { ProductDetailResponseDTO, ProductResponseDTO } from '../../dto/product/product.dto';

export const toProductResponseDTO = (
  entity: Product,
): ProductResponseDTO => {
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

export const toProductDetailResponseDTO = (
  entity: Product,
): ProductDetailResponseDTO => {
  return {
    id: entity.id,
    category: entity.category,
    title: entity.title,
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
