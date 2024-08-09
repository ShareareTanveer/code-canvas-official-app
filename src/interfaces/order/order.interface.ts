import { ISimpleUserResponse } from "user/user.interface";
import { IOrderItemResponse } from "./order-item.interface";
import { EOrderStaus } from '../../enum/order-status.enum';

export interface IOrderResponse {
  id: string;
  user: ISimpleUserResponse;
  items: IOrderItemResponse[];
  totalPrice?: number;
  orderStatus: EOrderStaus;
}

export interface ICreateOrder {
  cartId: string;
  user?: number;
}

export interface IUpdateOrder {
  cartId: string;
  user?: number;
}