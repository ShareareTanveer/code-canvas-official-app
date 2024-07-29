import { OrderItem } from '../../entities/order/order-item.entity';
import dataSource from '../../configs/orm.config';
import { Order } from '../../entities/order/order.entity';
import {
  OrderResponseDTO,
} from '../dto/order/order.dto';
import { toOrderResponseDTO } from './mapper/order.mapper';
import { Cart } from '../../entities/cart/cart.entity';
import { EOrderStaus } from '../../enum/order-status.enum';
import { BkashPaymentExecuteResponseDTO } from '../dto/order/bkash-payment.dto';

const repository = dataSource.getRepository(Order);
const cartRepository = dataSource.getRepository(Cart);

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

export default {
  syncData,
};
