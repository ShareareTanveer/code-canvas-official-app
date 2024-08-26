import { Blog } from '../../../entities/blog/blog.entity';
import {
  IBlogResponse,
  IBlogDetailResponse,
} from 'blog/blog.interface';

export const toIBlogResponse = (entity: Blog): IBlogResponse => {
  return {
    id: entity.id,
    subtitle: entity.subtitle,
    title: entity.title,
    slug: entity.slug,
    isFeatured: entity.isFeatured,
    views: entity.views,
    images: entity.images,
    category: entity.category,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

export const toIBlogDetailResponse = (
  entity: Blog,
  relatedBlogs?: IBlogResponse[],
): IBlogDetailResponse => {
  return {
    id: entity.id,
    subtitle: entity.subtitle,
    title: entity.title,
    slug: entity.slug,
    isFeatured: entity.isFeatured,
    views: entity.views,
    images: entity.images,
    category: entity.category,
    keyPoints: entity.keyPoints,
    description: entity.description,
    content: entity.content,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    relatedBlogs: relatedBlogs,
  };
};
