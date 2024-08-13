import { IWishlistResponse } from 'wishlist/wishlist.interface';
import { Wishlist } from '../../../entities/wishlist/wishlist.entity';

export const toIWishlistResponse = (
  entity: Wishlist,
): IWishlistResponse => {
  return {
    id: entity.id,
    products: entity.products,
    user: entity.user
  };
};
