import { IProductResponse } from 'product/product.interface';

export interface IOrderItemResponse {
  id: string;
  price: number;
  product?: IProductResponse;
}
