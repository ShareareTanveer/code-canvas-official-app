import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { Review } from '../../entities/review/review.entity';
import {
  CreateReviewDTO,
  ReviewResponseDTO,
  UpdateReviewDTO,
} from '../dto/review/review.dto';
import { toReviewResponseDTO } from './mapper/review.mapper';
import ApiUtility from '../../utilities/api.utility';
import { User } from '../../entities/user/user.entity';
import { Product } from '../../entities/product/product.entity';
import { IReviewQueryParams } from 'review.interface';

const repository = dataSource.getRepository(Review);
const productRepository = dataSource.getRepository(Product);

const getById = async (id: number): Promise<ReviewResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['product', 'user'],
  });
  if (!entity) {
    throw new Error('Review not found');
  }
  return toReviewResponseDTO(entity);
};

const list = async (params: IReviewQueryParams, user: User) => {
  let reviewRepo = repository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.user', 'user')
    .leftJoinAndSelect('review.product', 'product');

  if (user.role.name !== 'admin') {
    reviewRepo = reviewRepo.where('review.user.id = :userId', {
      userId: user.id,
    });
  }

  if (params.product) {
    reviewRepo = reviewRepo.where('product.id = :productId', {
        productId: params.product,
    });
  }

  // Pagination
  const paginationRepo = reviewRepo;
  const total = await paginationRepo.getMany();
  const pagRes = ApiUtility.getPagination(
    total.length,
    params.limit,
    params.page,
  );

  reviewRepo = reviewRepo
    .limit(params.limit)
    .offset(ApiUtility.getOffset(params.limit, params.page));
  const reviews = await reviewRepo.getMany();

  const response = [];
  if (reviews && reviews.length) {
    for (const item of reviews) {
      response.push(toReviewResponseDTO(item));
    }
  }
  return { response, pagination: pagRes.pagination };
};

const create = async (
  params: CreateReviewDTO,
  user: User,
): Promise<ReviewResponseDTO> => {
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
  return toReviewResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateReviewDTO,
  user: User,
): Promise<ReviewResponseDTO> => {
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
  return toReviewResponseDTO(updatedEntity);
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
