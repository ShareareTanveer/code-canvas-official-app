import { User } from '../../entities/user/user.entity';
import { Customer } from '../../entities/customer/customer.entity';
import { OrderItem } from '../../entities/order/order-item.entity';
import dataSource from '../../configs/orm.config';
import { Order } from '../../entities/order/order.entity';
import {
  CreateOrderDTO,
  OrderResponseDTO,
  UpdateOrderDTO,
} from '../dto/order/order.dto';
import { toOrderResponseDTO } from './mapper/order.mapper';
import { Cart } from '../../entities/cart/cart.entity';
import { EOrderStaus } from '../../enum/order-status.enum';
import { IBaseQueryParams } from 'common.interface';
import { listEntities } from '../../utilities/pagination-filtering.utility';

const repository = dataSource.getRepository(Order);
const cartRepository = dataSource.getRepository(Cart);
const userRepository = dataSource.getRepository(User);
const customerRepository = dataSource.getRepository(Customer);

const getById = async (id: string): Promise<OrderResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: [
      'items',
      'user',
      'items.product',
      'items.product.images',
    ],
  });
  if (!entity) {
    throw new Error('Order not found');
  }
  return toOrderResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(repository, params, 'order', {
    relations: [
      'items',
      'user',
      'items.product',
      'items.product.images',
    ],
    searchFields: [
      'items.product.title',
      'items.product.slug',
      'user.email',
      'items.product.tags.name',
    ],
    validSortBy: ['totalPrice', 'price', 'id'],
    validSortOrder: ['ASC', 'DESC'],
    toResponseDTO: toOrderResponseDTO,
  });
};

const create = async (
  params: CreateOrderDTO,
): Promise<OrderResponseDTO> => {
  const cart = await cartRepository.findOne({
    where: { id: params.cartId },
    relations: ['products'],
  });

  const user = await userRepository.findOne({
    where: { id: params.user },
  });
  const customer = await customerRepository.findOne({
    where: { user },
  });

  if (!customer) {
    throw new Error('user must fill the customer form');
  }

  if (!user) {
    throw new Error('user not found');
  }

  if (!cart) {
    throw new Error('Cart not found');
  }

  if (cart.products.length < 1) {
    throw new Error('Cart is empty');
  }

  const orderItems = cart.products.map((product) => {
    const orderItem = new OrderItem();
    orderItem.product = product;
    orderItem.price = product.price;
    return orderItem;
  });

  const order = new Order();
  order.user = user;
  order.items = orderItems;
  order.totalPrice = cart.totalPrice || 0;
  order.orderStatus = EOrderStaus.Pending;

  const savedOrder = await repository.save(order);
  // await cartRepository.remove(cart);

  return toOrderResponseDTO(savedOrder);
};

const update = async (
  id: string,
  params: UpdateOrderDTO,
): Promise<OrderResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Order not found');
  }
  const updatedEntity = await repository.save(entity);
  return toOrderResponseDTO(updatedEntity);
};

const remove = async (id: string): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Order not found');
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
