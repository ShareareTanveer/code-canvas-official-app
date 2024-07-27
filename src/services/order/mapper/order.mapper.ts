import { EOrderStaus } from '../../../enum/order-status.enum';
import { Order } from '../../../entities/order/order.entity';
import { OrderResponseDTO } from '../../dto/order/order.dto';

export const toOrderResponseDTO = (
  entity: Order,
): OrderResponseDTO => {
  return {
    id: entity.id,
    user: entity.user,
    items: entity.items,
    totalPrice: entity.totalPrice,
    orderStatus: entity.orderStatus
  };
};
