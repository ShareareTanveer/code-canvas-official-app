import dataSource from '../../configs/orm.config';
import { Product } from '../../entities/product/product.entity';
import { ProductImage } from '../../entities/product/product-image.entity';
import { Category } from '../../entities/category/category.entity';
import {
  toIProductDetailResponse,
  toIProductResponse,
} from './mapper/product.mapper';
import { In } from 'typeorm';
import { Tag } from '../../entities/tag/tag.entity';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import { IBaseQueryParams } from 'common.interface';
import {
  deleteFromCloud,
  uploadOnCloud,
} from '../..//utilities/cloudiary.utility';
import {
  ICreateProduct,
  IProductDetailResponse,
  IUpdateProduct,
} from 'product/product.interface';

const repository = dataSource.getRepository(Product);
const categoryRepository = dataSource.getRepository(Category);
const tagRepository = dataSource.getRepository(Tag);
const imageRepository = dataSource.getRepository(ProductImage);

const getById = async (id: number): Promise<IProductDetailResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images', 'category', 'tags', 'reviews'],
  });
  if (!entity) {
    throw new Error('Product not found');
  }
  return toIProductDetailResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'product', {
    searchFields: [
      'product.title',
      'product.slug',
      'category.name',
      'tags.name',
    ],
    validSortBy: ['title', 'price', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('product.category', 'category')
    .leftJoinAndSelect('product.tags', 'tags')
    .leftJoinAndSelect('product.images', 'images');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIProductResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIProductResponse);
  return { response };
};

const create = async (
  params: ICreateProduct,
): Promise<IProductDetailResponse> => {
  const category = await categoryRepository.findOne({
    where: { id: params.category },
  });

  if (!category) {
    throw new Error(`Category with ID ${params.category} not found`);
  }

  const product = new Product();
  product.category = category;
  product.title = params.title;
  product.slug = params.slug;
  product.description = params.description;
  product.subtitle = params.subtitle;
  product.live_link = params.live_link || null;
  product.support_for = params.support_for || null;
  product.price = params.price;
  product.is_documented = params.is_documented || false;

  if (params.tags) {
    const tagEntities = await tagRepository.findBy({
      id: In(params.tags),
    });
    product.tags = tagEntities;
  }

  if (params.images && params.images.length > 0) {
    const uploadPromises = params.images.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);

    const validResults = uploadResults.filter(
      (result) => result !== null,
    );

    if (validResults.length > 0) {
      product.images = validResults.map((result) => {
        const image = new ProductImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
    } else {
      throw new Error('Failed to upload all images');
    }
  }
  const savedEntity = await repository.save(product);
  return toIProductDetailResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateProduct,
): Promise<IProductDetailResponse> => {
  const product = await repository.findOne({
    where: { id },
    relations: ['images', 'category', 'tags'],
  });

  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }

  if (params.category) {
    const category = await categoryRepository.findOne({
      where: { id: params.category },
    });
    if (!category) {
      throw new Error(`Category with ID ${params.category} not found`);
    }
    product.category = category;
  }

  if (params.title) product.title = params.title;
  if (params.subtitle) product.subtitle = params.subtitle;
  if (params.slug) product.slug = params.slug;
  if (params.description) product.description = params.description;
  if (params.live_link) product.live_link = params.live_link;
  if (params.support_for) product.support_for = params.support_for;
  if (params.price !== undefined) product.price = params.price;
  if (params.is_documented !== undefined)
    product.is_documented = params.is_documented;

  if (params.tags) {
    const tagEntities = await tagRepository.findBy({
      id: In(params.tags),
    });
    product.tags = tagEntities;
  }

  if (params.addImages && params.addImages.length > 0) {
    const uploadPromises = params.addImages.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);
    const validResults = uploadResults.filter(
      (result) => result !== null,
    );
    if (validResults.length > 0) {
      product.images = validResults.map((result) => {
        const image = new ProductImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
    }
  }

  if (params.deleteImages && params.deleteImages.length > 0) {
    const imageEntities = await imageRepository.findBy({
      id: In(params.deleteImages),
    });

    const deletePromises = imageEntities.map((image) => {
      if (image.cloudinary_image_public_id) {
        return deleteFromCloud(image.cloudinary_image_public_id);
      }
    });
    await Promise.all(deletePromises);
    await imageRepository.remove(imageEntities);
  }
  const savedEntity = await repository.save(product);

  return toIProductDetailResponse(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images'],
  });
  if (!entity) {
    throw new Error('Product not found');
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
