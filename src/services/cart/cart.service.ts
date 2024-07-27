import { User } from '../../entities/user/user.entity';
import dataSource from '../../configs/orm.config';
import { Cart } from '../../entities/cart/cart.entity';
import { AddToCartDTO, CartResponseDTO } from '../dto/cart/cart.dto';
import { toCartResponseDTO } from './mapper/cart.mapper';
import { Product } from '../../entities/product/product.entity';

const repository = dataSource.getRepository(Cart);
const productRepository = dataSource.getRepository(Product);

const getById = async (id: string): Promise<CartResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['products', 'user'],
  });
  if (!entity) {
    throw new Error('Cart not found');
  }
  return toCartResponseDTO(entity);
};

const list = async (): Promise<CartResponseDTO[]> => {
  const entities = await repository.find({
    relations: ['products', 'user'],
  });
  return entities.map(toCartResponseDTO);
};

const toggleCartProduct = async (
  params: AddToCartDTO,
  user: User,
): Promise<{ data: CartResponseDTO; added: boolean }> => {
  const product = await productRepository.findOne({
    where: { id: params.product },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  let cart = await repository.findOne({
    where: { user: { id: user.id } },
    relations: ['products', 'user'],
  });

  if (!cart) {
    cart = repository.create({ user, products: [], totalPrice: 0 });
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



const remove = async (id: string, user: User): Promise<void> => {
  const cart = await repository.findOne({ where: { id }, relations: ['user'] });
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.user = null;
  await repository.save(cart);

  await repository.remove(cart);
};


export default {
  getById,
  list,
  toggleCartProduct,
  remove,
};
