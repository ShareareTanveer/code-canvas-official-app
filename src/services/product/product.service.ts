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
import { ProductCategory } from '../../entities/product/productCategory.entity';
import { PriceOption } from '../../entities/product/priceOption.entity';
import { EDiscountType } from '../../enum/discountType.enum';

const repository = dataSource.getRepository(Product);
const tagRepository = dataSource.getRepository(Tag);
const imageRepository = dataSource.getRepository(ProductImage);
const productCategoryRepository =
  dataSource.getRepository(ProductCategory);
const priceOptionsRepository = dataSource.getRepository(PriceOption);

const getById = async (id: number): Promise<IProductDetailResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images', 'productCategory', 'priceOptions', 'tags'],
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
      'productCategory.name',
      'tags.name',
    ],
    validSortBy: [ 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('product.productCategory', 'productCategory')
    .leftJoinAndSelect('product.tags', 'tags')
    .leftJoinAndSelect('product.priceOptions', 'priceOptions')
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
  const productCategory = await productCategoryRepository.findOne({
    where: { id: params.productCategory },
  });

  if (!productCategory) {
    throw new Error(
      `productCategory with ID ${params.productCategory} not found`,
    );
  }

  const product = new Product();
  product.productCategory = productCategory;
  product.title = params.title;
  product.slug = params.slug;
  product.description = params.description;
  product.subtitle = params.subtitle;
  product.live_link = params.live_link || null;
  product.is_documented = params.is_documented || false;

  product.priceOptions = params.priceOptions.map((option) => {
    const priceOption = new PriceOption();
    priceOption.title = option.title;
    priceOption.serviceLink = option.serviceLink;
    priceOption.pricePer = option.pricePer;
    priceOption.price = option.price;
    priceOption.support_for = option.support_for;
    priceOption.discount = option.discount;
    priceOption.keyPoints = option.keyPoints || [];
    priceOption.discountType =
      option.discountType || EDiscountType.AMOUNT;
    return priceOption;
  });

  if (params.tags) {
    const tagEntities = await tagRepository.findBy({
      id: In(params.tags),
    });
    product.tags = tagEntities;
  }

  if (params.featuredImage) {
    const uploadedImage = await uploadOnCloud(params.featuredImage);
    if (!uploadedImage)
      throw new Error('Failed to upload featured image');
    product.featuredImage = uploadedImage.secure_url;
    product.cloudinary_image_public_id = uploadedImage.public_id;
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
    relations: ['images', 'productCategory', 'tags', 'priceOptions'],
  });

  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }

  if (params.productCategory) {
    const productCategory = await productCategoryRepository.findOne({
      where: { id: params.productCategory },
    });
    if (!productCategory) {
      throw new Error(
        `Category with ID ${params.productCategory} not found`,
      );
    }
    product.productCategory = productCategory;
  }

  if (params.title) product.title = params.title;
  if (params.subtitle) product.subtitle = params.subtitle;
  if (params.slug) product.slug = params.slug;
  if (params.description) product.description = params.description;
  if (params.live_link) product.live_link = params.live_link;
  if (params.is_documented !== undefined)
    product.is_documented = params.is_documented;

  if (params.tags) {
    const tagEntities = await tagRepository.findBy({
      id: In(params.tags),
    });
    product.tags = tagEntities;
  }

  if (params.addPriceOptions && params.addPriceOptions.length > 0) {
    const updatedPriceOptions = params.addPriceOptions.map((option) => {
      const existingOption = product.priceOptions.find(
        (po) => po.id === option.id,
      );

      if (existingOption) {
        existingOption.title = option.title;
        existingOption.serviceLink = option.serviceLink;
        existingOption.pricePer = option.pricePer;
        existingOption.price = option.price;
        existingOption.discount = option.discount;
        existingOption.support_for = option.support_for;
        existingOption.keyPoints = option.keyPoints;
        existingOption.discountType =
          option.discountType || EDiscountType.AMOUNT;
        return existingOption;
      } else {
        const newPriceOption = new PriceOption();
        newPriceOption.title = option.title;
        newPriceOption.serviceLink = option.serviceLink;
        newPriceOption.pricePer = option.pricePer;
        newPriceOption.price = option.price;
        newPriceOption.discount = option.discount;
        newPriceOption.support_for = option.support_for;
        newPriceOption.keyPoints = option.keyPoints;
        newPriceOption.discountType =
          option.discountType || EDiscountType.AMOUNT;
        return newPriceOption;
      }
    });

    product.priceOptions = updatedPriceOptions;
  }

  if (
    params.deletePriceOptions &&
    params.deletePriceOptions.length > 0
  ) {
    product.priceOptions = product.priceOptions.filter(
      (priceOption) =>
        !params.deletePriceOptions.includes(priceOption.id),
    );

    const priceOptionsEntities = await priceOptionsRepository.findBy({
      id: In(params.deletePriceOptions),
    });
    await priceOptionsRepository.remove(priceOptionsEntities);
  }

  let imageUrl;
  let cloudiaryPublicId;

  if (params.featuredImage) {
    const uploadImage = await uploadOnCloud(params.featuredImage);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }
  if (imageUrl) product.featuredImage = imageUrl;
  if (imageUrl) product.cloudinary_image_public_id = cloudiaryPublicId;
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
        const image = new ProductImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
      product.images.push(...newImages);
    }
  }

  if (params.deleteImages && params.deleteImages.length > 0) {
    const imageEntities = await imageRepository.find({
      where: { id: In(params.deleteImages), product: { id } },
      relations: ['product'],
    });
    product.images = product.images.filter(
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
