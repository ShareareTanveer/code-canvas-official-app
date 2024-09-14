import dataSource from '../../configs/orm.config';
import { Cart } from '../../entities/cart/cart.entity';
import { toICartResponse } from './mapper/cart.mapper';
import { Product } from '../../entities/product/product.entity';
import { IBaseQueryParams } from 'common.interface';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import { IAddToCart, ICartResponse } from 'cart/cart.interface';

const repository = dataSource.getRepository(Cart);
const productRepository = dataSource.getRepository(Product);

const getById = async (id: string): Promise<ICartResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['products', 'products.images'],
  });
  if (!entity) {
    throw new Error('Cart not found');
  }
  return toICartResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'cart', {
    searchFields: ['products.title'],
    validSortBy: ['cart.id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo.leftJoinAndSelect('cart.products', 'products');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toICartResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toICartResponse);
  return { response };
};

const toggleCartProduct = async (
  params: IAddToCart,
): Promise<{ data: ICartResponse; added: boolean }> => {
  const product = await productRepository.findOne({
    where: { id: params.product },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  let cart;

  if (params.cartId) {
    cart = await repository.findOne({
      where: { id: params.cartId },
      relations: ['products'],
    });
  }

  if (!cart) {
    cart = repository.create({ products: [], totalPrice: 0 });
  }

  const productExists = cart.products.some((p) => p.id === product.id);
  const added = !productExists;

  cart.products = productExists
    ? cart.products.filter((p) => p.id !== product.id)
    : [...cart.products, product];

  // cart.totalPrice = cart.products.reduce(
  //   (total, prod) => total + prod.price,
  //   0,
  // );

  const updatedCart = await repository.save(cart);

  return { data: toICartResponse(updatedCart), added };
};

const remove = async (id: string): Promise<void> => {
  const cart = await repository.findOne({
    where: { id },
  });
  if (!cart) {
    throw new Error('Cart not found');
  }

  await repository.remove(cart);
};

export default {
  getById,
  list,
  toggleCartProduct,
  remove,
};
