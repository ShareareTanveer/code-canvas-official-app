import dataSource from '../../configs/orm.config';
import { Blog } from '../../entities/blog/blog.entity';
import { BlogImage } from '../../entities/blog/blog-image.entity';
import { In, Not } from 'typeorm';
import { IBaseQueryParams } from 'common.interface';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import {
  deleteFromCloud,
  uploadOnCloud,
} from '../../utilities/cloudiary.utility';
import {
  IBlogDetailResponse,
  ICreateBlog,
  IUpdateBlog,
} from 'blog/blog.interface';
import {
  toIBlogDetailResponse,
  toIBlogResponse,
} from './mapper/blog.mapper';
import { Category } from '../../entities/category/category.entity';

const repository = dataSource.getRepository(Blog);
const categoryRepository = dataSource.getRepository(Category);
const imageRepository = dataSource.getRepository(BlogImage);

const getById = async (
  id: number,
): Promise<IBlogDetailResponse> => {
  const entity = await repository.findOne({
    where: {
      id,
    },
    relations: [
      'images',
      'category',
    ],
  });

  if (!entity) {
    throw new Error('Blog not found ');
  }

  const relatedBlogs = await repository.find({
    where: {
      category: entity.category,
      id: Not(id),
    },
    take: 4,
    relations: ['images'],
  });

  const relatedBlogResponses = relatedBlogs.map(blog => toIBlogResponse(blog));
  return toIBlogDetailResponse(entity, relatedBlogResponses);
};


const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'blog', {
    searchFields: ['title', 'subtitle', 'slug'],
    validSortBy: ['title', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo.leftJoinAndSelect('blog.images', 'images');
  repo.leftJoinAndSelect('blog.category', 'category');
 

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIBlogResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIBlogResponse);
  return { response };
};

const create = async (
  params: ICreateBlog,
): Promise<IBlogDetailResponse> => {
  const category = await categoryRepository.findOne({
    where: { id: params.category },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  const blog = new Blog();
  blog.title = params.title;
  blog.subtitle = params.subtitle;
  blog.slug = params.slug;
  blog.description = params.description;
  blog.content = params.content;
  blog.isFeatured = params.isFeatured;
  blog.category = category;
  blog.keyPoints = params.keyPoints || [];

  if (params.images && params.images.length > 0) {
    const uploadPromises = params.images.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);

    const validResults = uploadResults.filter(
      (result) => result !== null,
    );

    if (validResults.length > 0) {
      blog.images = validResults.map((result) => {
        const image = new BlogImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
    } else {
      throw new Error('Failed to upload all images');
    }
  }

  const savedEntity = await repository.save(blog);
  return toIBlogDetailResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateBlog,
): Promise<IBlogDetailResponse> => {
  const blog = await repository.findOne({
    where: { id },
    relations: ['images'],
  });

  const category = await categoryRepository.findOne({
    where: { id: params.category },
  });
  if (!category) {
    throw new Error('category not found');
  }

  if (!blog) {
    throw new Error(`Blog with ID ${id} not found`);
  }

  if (params.title !== undefined) blog.title = params.title;
  if (params.subtitle !== undefined) blog.subtitle = params.subtitle;
  if (params.isFeatured !== undefined)
    blog.isFeatured = params.isFeatured;
  if (params.category !== undefined) blog.category = category;
  if (params.slug !== undefined) blog.slug = params.slug;
  if (params.content !== undefined) blog.content = params.content;
  if (params.description !== undefined)
    blog.description = params.description;
  if (params.keyPoints !== undefined) blog.keyPoints = params.keyPoints;

  if (params.addImages && params.addImages.length > 0) {
    const uploadPromises = params.addImages.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);
    const validResults = uploadResults.filter(
      (result) => result !== null,
    );

    if (validResults.length > 0) {
      const newImages = validResults.map((result) => {
        const image = new BlogImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
      blog.images.push(...newImages);
    }
  }

  if (params.deleteImages && params.deleteImages.length > 0) {
    const imageEntities = await imageRepository.find({
      where: { id: In(params.deleteImages), blog: { id } },
      relations: ['blog'],
    });
    blog.images = blog.images.filter(
      (image) => !params.deleteImages.includes(image.id),
    );
    const deletePromises = imageEntities.map((image) => {
      if (image.cloudinary_image_public_id) {
        return deleteFromCloud(image.cloudinary_image_public_id);
      }
      return Promise.resolve();
    });
    await Promise.all(deletePromises);
    await imageRepository.remove(imageEntities);
  }

  const savedEntity = await repository.save(blog);
  return toIBlogDetailResponse(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images'],
  });
  if (!entity) {
    throw new Error('Blog not found');
  }

  for (const item of entity.images) {
    if (item.cloudinary_image_public_id) {
      await deleteFromCloud(item.cloudinary_image_public_id);
    }
  }

  await repository.remove(entity);
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
