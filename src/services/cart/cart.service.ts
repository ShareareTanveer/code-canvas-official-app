import { User } from '../../entities/user/user.entity';
import dataSource from '../../configs/orm.config';
import { Cart } from '../../entities/cart/cart.entity';
import { AddToCartDTO, CartResponseDTO } from '../dto/cart/cart.dto';
import { toCartResponseDTO } from './mapper/cart.mapper';
import { Product } from '../../entities/product/product.entity';
import { IBaseQueryParams } from 'common.interface';
import { applyPagination, listEntities, listEntitiesUtill } from '../../utilities/pagination-filtering.utility';

const repository = dataSource.getRepository(Cart);
const productRepository = dataSource.getRepository(Product);

const getById = async (id: string): Promise<CartResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['products'],
  });
  if (!entity) {
    throw new Error('Cart not found');
  }
  return toCartResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'cart', {
    searchFields: ['products.title'],
    validSortBy: ['cart.id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('cart.products', 'products')

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toCartResponseDTO);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toCartResponseDTO);
  return { response };
};

const toggleCartProduct = async (
  params: AddToCartDTO,
): Promise<{ data: CartResponseDTO; added: boolean }> => {
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

  cart.totalPrice = cart.products.reduce(
    (total, prod) => total + prod.price,
    0,
  );

  const updatedCart = await repository.save(cart);

  return { data: toCartResponseDTO(updatedCart), added };
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
