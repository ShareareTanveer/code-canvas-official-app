import { IProductResponse } from 'product/product.interface';
import { ISimpleUserResponse } from 'user/user.interface';

export interface IWishlistResponse {
  id: number;
  products: IProductResponse[];
  user: ISimpleUserResponse;
}

export interface IAddToWishlist {
  product: number;
  user: number;
}
