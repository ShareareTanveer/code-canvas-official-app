import dataSource from '../../configs/orm.config';
import { toIWishlistResponse } from './mapper/wishlist.mapper';
import { Product } from '../../entities/product/product.entity';
import { IBaseQueryParams } from 'common.interface';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import {
  IAddToWishlist,
  IWishlistResponse,
} from 'wishlist/wishlist.interface';
import { Wishlist } from '../../entities/wishlist/wishlist.entity';
import { User } from '../../entities/user/user.entity';

const repository = dataSource.getRepository(Wishlist);
const productRepository = dataSource.getRepository(Product);
const userRepository = dataSource.getRepository(User);

const getById = async (id: number): Promise<IWishlistResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['products', 'products.images', 'user'],
  });
  if (!entity) {
    throw new Error('wishlist not found');
  }
  return toIWishlistResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'wishlist', {
    searchFields: ['products.title'],
    validSortBy: ['wishlist.id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo.leftJoinAndSelect('wishlist.products', 'products');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIWishlistResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIWishlistResponse);
  return { response };
};

const toggleWishlistProduct = async (
  params: IAddToWishlist,
): Promise<{ data: IWishlistResponse; added: boolean }> => {
  // Fetch the product
  const product = await productRepository.findOne({
    where: { id: params.product },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  const user = await userRepository.findOne({
    where: { id: params.user },
    relations: ['wishlist'],
  });

  if (!user) {
    throw new Error('User not found');
  }

  let wishlist = await repository.findOne({
    where: { id: user.wishlist?.id },
    relations: ['products'],
  });

  if (!wishlist) {
    wishlist = repository.create({ products: [], user });
  }

  const productExists = wishlist.products.some((p) => p.id === product.id);
  const added = !productExists;

  wishlist.products = productExists
    ? wishlist.products.filter((p) => p.id !== product.id)
    : [...wishlist.products, product];

  const { user: _, ...wishlistToSave } = wishlist;

  const updatedWishlist = await repository.save(wishlistToSave);

  updatedWishlist.user = user;

  return { data: toIWishlistResponse(updatedWishlist), added };
};


const remove = async (id: number): Promise<void> => {
  const wishlist = await repository.findOne({
    where: { id },
  });
  if (!wishlist) {
    throw new Error('wishlist not found');
  }

  await repository.remove(wishlist);
};

export default {
  getById,
  list,
  toggleWishlistProduct,
  remove,
};
