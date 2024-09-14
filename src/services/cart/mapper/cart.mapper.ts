import { Cart } from '../../../entities/cart/cart.entity';
import { ICartResponse } from 'cart/cart.interface';

export const toICartResponse = (
  entity: Cart,
): ICartResponse => {
  return {
    id: entity.id,
    // products?: entity.products,
    totalPrice: entity.totalPrice,
  };
};
