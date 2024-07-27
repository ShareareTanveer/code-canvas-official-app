import { IsUUID } from 'class-validator';
import { SimpleUserResponseDTO } from '../user/user.dto';
import { OrderItemResponseDTO } from './order-item.dto';
import { EOrderStaus } from '../../../enum/order-status.enum';

export class OrderResponseDTO {
  id: string;
  user: SimpleUserResponseDTO;
  items: OrderItemResponseDTO[];
  totalPrice?: number;
  orderStatus: EOrderStaus;
}

export class CreateOrderDTO {
  cartId: string;
}

export class UpdateOrderDTO {
  @IsUUID()
  cartId: string;
}
