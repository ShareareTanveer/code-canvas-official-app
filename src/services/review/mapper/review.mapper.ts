import { IReviewResponse } from 'review/review.interface';
import { Review } from '../../../entities/review/review.entity';

export const toIReviewResponse = (
  entity: Review,
): IReviewResponse => {
  return {
    id: entity.id,
    product: entity.product,
    user: entity.product,
    text: entity.text,
    rating: entity.rating,
  };
};
