import { IOrderResponse } from 'order/order.interface';
import { Order } from '../../../entities/order/order.entity';

export const toIOrderResponse = (
  entity: Order,
): IOrderResponse => {
  return {
    id: entity.id,
    user: entity.user,
    items: entity.items,
    totalPrice: entity.totalPrice,
    orderStatus: entity.orderStatus
  };
};
