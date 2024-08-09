import { ITagResponse } from 'tag/tag.interface';
import { Tag } from '../../../entities/tag/tag.entity';

export const toITagResponse = (
  entity: Tag,
): ITagResponse => {
  return {
    id: entity.id,
    name: entity.name,
  };
};
