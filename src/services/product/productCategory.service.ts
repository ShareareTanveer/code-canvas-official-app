import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import dataSource from '../../configs/orm.config';
import { IBaseQueryParams } from 'common.interface';
import {
  IProductCategoryResponse,
  ICreateProductCategory,
  IUpdateProductCategory,
} from 'product/productCategory';
import { ProductCategory } from '../../entities/product/productCategory.entity';
import { toIProductCategoryResponse } from './mapper/productCategory.mapper';
import {
  uploadOnCloud,
  deleteFromCloud,
} from '../../utilities/cloudiary.utility';

const repository = dataSource.getRepository(ProductCategory);

const getById = async (
  id: number,
): Promise<IProductCategoryResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ProductCategory not found');
  }
  return toIProductCategoryResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(
    repository,
    params,
    'productCategory',
    {
      searchFields: ['name'],
      validSortBy: ['name', 'id'],
      validSortOrder: ['ASC', 'DESC'],
    },
  );

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIProductCategoryResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIProductCategoryResponse);
  return { response };
};

const create = async (
  params: ICreateProductCategory,
): Promise<IProductCategoryResponse> => {
  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  const category = new ProductCategory();
  category.color = params.color;
  category.icon = params.icon;
  category.subtitle = params.subtitle;
  category.name = params.name;

  if (imageUrl) category.image = imageUrl;
  if (imageUrl) category.cloudinary_image_public_id = cloudiaryPublicId;

  const entity = repository.create(category);
  const savedEntity = await repository.save(entity);
  return toIProductCategoryResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateProductCategory,
): Promise<IProductCategoryResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ProductCategory not found');
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }
  if (imageUrl && entity.cloudinary_image_public_id)
    deleteFromCloud(entity.cloudinary_image_public_id);

  if (params.name !== undefined) entity.name = params.name;
  if (params.subtitle !== undefined) entity.subtitle = params.subtitle;
  if (params.color !== undefined) entity.color = params.color;
  if (params.icon !== undefined) entity.icon = params.icon;

  if (imageUrl) entity.image = imageUrl;
  if (imageUrl) entity.cloudinary_image_public_id = cloudiaryPublicId;
  
  const savedEntity = await repository.save(entity);
  return toIProductCategoryResponse(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ProductCategory not found');
  }
  await repository.remove(entity);
  return;
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
