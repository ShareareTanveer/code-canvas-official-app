import { ICategoryResponse } from 'category/category.interface';
import { Category } from '../../../entities/category/category.entity';

export const toICategoryResponse = (
  entity: Category,
): ICategoryResponse => {
  return {
    id: entity.id,
    name: entity.name,
  };
};
