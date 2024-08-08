import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { EOrderStaus } from '../../enum/order-status.enum';
import { SimpleUserResponseDTO } from '../user/user.interface';
import { OrderItemResponseDTO } from './order-item.interface';

export class OrderResponseDTO {
  id: string;
  user: SimpleUserResponseDTO;
  items: OrderItemResponseDTO[];
  totalPrice?: number;
  orderStatus: EOrderStaus;
}

export class CreateOrderDTO {
  @IsUUID()
  @IsNotEmpty()
  cartId: string;

  @IsOptional()
  user?: number;
}

export class UpdateOrderDTO {
  @IsUUID()
  cartId: string;

  @IsOptional()
  user?: number;
}
