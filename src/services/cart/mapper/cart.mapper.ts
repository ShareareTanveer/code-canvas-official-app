import { CartResponseDTO } from '../../../services/dto/cart/cart.dto';
import { Cart } from '../../../entities/cart/cart.entity';

export const toCartResponseDTO = (
  entity: Cart,
): CartResponseDTO => {
  return {
    id: entity.id,
    user: entity.user,
    products: entity.products,
    totalPrice: entity.totalPrice,
  };
};
