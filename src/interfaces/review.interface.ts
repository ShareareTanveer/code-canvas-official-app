import { IBaseQueryParams } from "common.interface";

export interface IReviewQueryParams extends IBaseQueryParams {
    product?: number | string;
  }
  