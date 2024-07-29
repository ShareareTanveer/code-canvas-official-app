import dataSource from '../../configs/orm.config';
import { Product } from '../../entities/product/product.entity';
import { ProductImage } from '../../entities/product/product-image.entity';
import { Category } from '../../entities/category/category.entity';
import {
  CreateProductDTO,
  ProductDetailResponseDTO,
  UpdateProductDTO,
} from '../dto/product/product.dto';
import {
  toProductDetailResponseDTO,
  toProductResponseDTO,
} from './mapper/product.mapper';
import { In } from 'typeorm';
import { Tag } from '../../entities/tag/tag.entity';
import { listEntities } from '../../utilities/pagination-filtering.utility';
import { IBaseQueryParams } from 'common.interface';

const repository = dataSource.getRepository(Product);
const categoryRepository = dataSource.getRepository(Category);
const tagRepository = dataSource.getRepository(Tag);

const getById = async (
  id: number,
): Promise<ProductDetailResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images', 'category', 'tags', 'reviews'],
  });
  console.log(entity);
  console.log(typeof entity.price);
  if (!entity) {
    throw new Error('Product not found');
  }
  return toProductDetailResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(repository, params, 'product', {
    relations: ['category', 'tags', 'images'],
    searchFields: [
      'product.title',
      'product.slug',
      'category.name',
      'tags.name',
    ],
    validSortBy: ['title', 'price', 'id'],
    validSortOrder: ['ASC', 'DESC'],
    toResponseDTO: toProductResponseDTO,
  });
};


const create = async (
  params: CreateProductDTO,
): Promise<ProductDetailResponseDTO> => {
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
    product.images = params.images.map((url) => {
      const image = new ProductImage();
      image.image = url;
      return image;
    });
  }
  const savedEntity = await repository.save(product);
  console.log(savedEntity);
  return toProductDetailResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateProductDTO,
): Promise<ProductDetailResponseDTO> => {
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

  if (params.images && params.images.length > 0) {
    product.images = params.images.map((url) => {
      const image = new ProductImage();
      image.image = url;
      return image;
    });
  }
  const savedEntity = await repository.save(product);

  return toProductDetailResponseDTO(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Product not found');
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
