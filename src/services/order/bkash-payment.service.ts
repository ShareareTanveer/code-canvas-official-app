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
import { BkashPaymentExecuteResponseDTO } from '../dto/order/bkash-payment.dto';

const repository = dataSource.getRepository(Order);
const cartRepository = dataSource.getRepository(Cart);

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

const list = async (): Promise<OrderResponseDTO[]> => {
  const entities = await repository.find({
    relations: [
      'items',
      'user',
      'items.product',
      'items.product.images',
    ],
  });
  return entities.map(toOrderResponseDTO);
};

const syncData = async (
  params: BkashPaymentExecuteResponseDTO,
): Promise<OrderResponseDTO> => {
  const cart = await cartRepository.findOne({
    where: { id: params.cartId },
    relations: ['products', 'user'],
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const orderItems = cart.products.map((product) => {
    const orderItem = new OrderItem();
    orderItem.product = product;
    orderItem.price = product.price;
    return orderItem;
  });

  const order = new Order();
  order.user = cart.user;
  order.items = orderItems;
  order.totalPrice = cart.totalPrice || 0;
  order.orderStatus = EOrderStaus.Paid;

  order.merchantInvoiceNumber = params.merchantInvoiceNumber;
  order.paymentNumber = params.paymentBkashNumber;
  order.paymentExecuteTime = params.paymentExecuteTime;
  order.paymentID = params.paymentID;
  order.paymentPortal = params.paymentPortal;
  order.trxID = params.trxID;

  const savedOrder = await repository.save(order);

  cart.user = null;
  await cartRepository.save(cart);
  await cartRepository.remove(cart);

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
  syncData,
  update,
  remove,
};
