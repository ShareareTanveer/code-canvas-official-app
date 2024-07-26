import { Category } from '../../../entities/category/category.entity';
import { CategoryResponseDTO } from '../../dto/category/category.dto';

export const toCategoryResponseDTO = (
  entity: Category,
): CategoryResponseDTO => {
  return {
    id: entity.id,
    name: entity.name,
  };
};
