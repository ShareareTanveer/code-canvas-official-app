import { EDiscountType } from '../../enum/discountType.enum';
import { IProductResponse } from './product.interface';

export interface ISimplePriceOptionResponse {
  id: number;
  title: string;
  discount: number;
  discountType: EDiscountType;
  price: number;
  totalPrice?: number;
  pricePer?: string;
  serviceLink?: string;
}
export interface IPriceOptionResponse {
  id: number;
  title: string;
  discount: number;
  discountType: EDiscountType;
  product?: IProductResponse;
  price: number;
  totalPrice?: number;
  support_for: string;
  keyPoints?: string[];
  pricePer?: string;
  serviceLink?: string;
}

export interface ICreatePriceOption {
  title: string;
  discount: number;
  discountType?: EDiscountType;
  products?: number[];
  price: number;
  support_for: string;
  keyPoints: string[];
  pricePer?: string;
  serviceLink?: string;
}

export interface IUpdatePriceOption {
  title?: string;
  id?: number;
  discount?: number;
  discountType?: EDiscountType;
  minQuantity?: number;
  products?: number[];
  price?: number;
  support_for?: string;
  keyPoints?: string[];
  pricePer?: string;
  serviceLink?: string;
}
