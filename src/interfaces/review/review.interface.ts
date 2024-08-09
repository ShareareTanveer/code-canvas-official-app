import { IProductResponse } from "product/product.interface";
import { ERating } from "../../enum/rating.enum";
import { ISimpleUserResponse } from "user/user.interface";

export interface IReviewResponse {
  id: number;
  product: IProductResponse;
  user: ISimpleUserResponse;
  text?: string;
  rating: ERating;
}

export interface ICreateReview {
  text?: string;
  rating: ERating;
  product: number;
}

export interface IUpdateReview {
  text?: string;
  rating?: ERating;
}