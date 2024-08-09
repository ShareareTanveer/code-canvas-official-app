import { IProductResponse } from "product/product.interface";

export interface ICartResponse {
  id: string;
  products: IProductResponse[];
  totalPrice?: number;
}

export interface IAddToCart {
  product: number;
  cartId?: string;
}
