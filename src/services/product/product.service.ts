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
import { toProductDetailResponseDTO, toProductResponseDTO } from './mapper/product.mapper';

const repository = dataSource.getRepository(Product);
const categoryRepository = dataSource.getRepository(Category);

const getById = async (id: number): Promise<ProductDetailResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images', 'category'],
  });
  if (!entity) {
    throw new Error('Product not found');
  }
  return toProductDetailResponseDTO(entity);
};

const list = async (): Promise<ProductResponseDTO[]> => {
  const entities = await repository.find({
    relations: ['images', 'category'],
  });
  return entities.map(toProductResponseDTO);
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
  const product = await repository.findOne({ where: { id }, relations: ['images', 'category'] });

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
