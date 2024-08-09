import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { Review } from '../../entities/review/review.entity';
import { toIReviewResponse } from './mapper/review.mapper';
import { User } from '../../entities/user/user.entity';
import { Product } from '../../entities/product/product.entity';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import { ICreateReview, IReviewResponse, IUpdateReview } from 'review/review.interface';

const repository = dataSource.getRepository(Review);
const productRepository = dataSource.getRepository(Product);

const getById = async (id: number): Promise<IReviewResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['product', 'user'],
  });
  if (!entity) {
    throw new Error('Review not found');
  }
  return toIReviewResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'review', {
    searchFields: [
      'product.title',
      'product.slug',
      'category.name',
      'user.email',
      'product.tags.name',
    ],
    validSortBy: ['id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('review.user', 'user')
    .leftJoinAndSelect('review.product', 'product');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIReviewResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIReviewResponse);
  return { response };
};

const create = async (
  params: ICreateReview,
  user: User,
): Promise<IReviewResponse> => {
  const productEntity = await productRepository.findOne({
    where: { id: params.product },
  });

  if (!productEntity) {
    throw new Error('Product not found');
  }

  const entity = new Review();
  entity.rating = params.rating;
  entity.text = params.text;
  entity.product = productEntity;
  entity.user = user;

  const savedEntity = await repository.save(entity);
  return toIReviewResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateReview,
  user: User,
): Promise<IReviewResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['user'],
  });
  if (!entity) {
    throw new Error('Review not found');
  }

  if (entity.user.id !== user.id && user.role.name !== 'admin') {
    throw new Error('Review does not associated with the user');
  }

  if (params.rating) entity.rating = params.rating;
  if (params.text !== undefined) entity.text = params.text;

  const updatedEntity = await repository.save(entity);
  return toIReviewResponse(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Review not found');
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
