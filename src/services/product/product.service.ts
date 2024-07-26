import dataSource from '../../configs/orm.config';
import { Product } from '../../entities/product/product.entity';
import { ProductImage } from '../../entities/product/product-image.entity';
import { Category } from '../../entities/category/category.entity';
import {
  CreateProductDTO,
  ProductDetailResponseDTO,
  ProductResponseDTO,
  UpdateProductDTO,
} from '../dto/product/product.dto';
import {
  toProductDetailResponseDTO,
  toProductResponseDTO,
} from './mapper/product.mapper';
import ApiUtility from '../../utilities/api.utility';
import { IProductQueryParams } from 'product.interface';
import { In } from 'typeorm';
import { Tag } from '../../entities/tag/tag.entity';

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
  if (!entity) {
    throw new Error('Product not found');
  }
  return toProductDetailResponseDTO(entity);
};

const list = async (params: IProductQueryParams) => {
  let productRepo = repository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.category', 'category')
    .leftJoinAndSelect('product.images', 'images')
    .leftJoinAndSelect('product.tags', 'tags');

  if (params.keyword) {
    productRepo = productRepo.andWhere(
      '(LOWER(product.title) LIKE LOWER(:keyword) OR LOWER(product.slug) LIKE LOWER(:keyword) OR LOWER(category.name) LIKE LOWER(:keyword) OR LOWER(tags.name) LIKE LOWER(:keyword))',
      { keyword: `%${params.keyword}%` },
    );
  }

  if (params.sortBy && params.sortOrder) {
    const validSortBy = ['title', 'price'];
    const validSortOrder = ['ASC', 'DESC'];
  
    if (validSortBy.includes(params.sortBy) && validSortOrder.includes(params.sortOrder.toUpperCase())) {
      productRepo = productRepo.orderBy(`product.${params.sortBy}`, params.sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }
  }
  
  

  // Pagination
  const paginationRepo = productRepo;
  const total = await paginationRepo.getMany();
  const pagRes = ApiUtility.getPagination(
    total.length,
    params.limit,
    params.page,
  );

  productRepo = productRepo
    .limit(params.limit)
    .offset(ApiUtility.getOffset(params.limit, params.page));
  const products = await productRepo.getMany();

  const response = [];
  if (products && products.length) {
    for (const item of products) {
      response.push(toProductResponseDTO(item));
    }
  }
  return { response, pagination: pagRes.pagination };
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
    const tagEntities =
      await tagRepository.findBy({ id: In(params.tags) })
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
    const tagEntities =
      await tagRepository.findBy({ id: In(params.tags) })
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
