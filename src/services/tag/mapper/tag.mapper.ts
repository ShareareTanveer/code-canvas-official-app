import { Tag } from '../../../entities/tag/tag.entity';
import { TagResponseDTO } from '../../dto/tag/tag.dto';

export const toTagResponseDTO = (
  entity: Tag,
): TagResponseDTO => {
  return {
    id: entity.id,
    name: entity.name,
  };
};
