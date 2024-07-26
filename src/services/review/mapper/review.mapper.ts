import { Review } from '../../../entities/review/review.entity';
import { ReviewResponseDTO } from '../../dto/review/review.dto';

export const toReviewResponseDTO = (
  entity: Review,
): ReviewResponseDTO => {
  return {
    id: entity.id,
    product: entity.product,
    user: entity.product,
    text: entity.text,
    rating: entity.rating,
  };
};
