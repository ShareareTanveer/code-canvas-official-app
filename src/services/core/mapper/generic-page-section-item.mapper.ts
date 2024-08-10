import { IGenericPageSectionItemResponse } from 'core/generic-page-section-item.interface';
import { GenericPageSectionItem } from '../../../entities/core/generic-page-section-item.entity';

export const toIGenericPageSectionItemResponse = (
  entity: GenericPageSectionItem,
): IGenericPageSectionItemResponse => {
  return {
    id: entity.id,
    title: entity.title,
    subtitle: entity.subtitle,
    description: entity.description,
    icon: entity.icon,
    image: entity.image,
    keyPoints: entity.keyPoints,
    genericPageSection: entity.genericPageSection,
  };
};
