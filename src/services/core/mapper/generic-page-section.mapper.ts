import { IGenericPageSectionResponse } from 'core/generic-page-section.interface';
import { GenericPageSection } from '../../../entities/core/generic-page-section.entity';

export const toIGenericPageSectionResponse = (
  entity: GenericPageSection,
): IGenericPageSectionResponse => {
  return {
    id: entity.id,
    title: entity.title,
    subtitle: entity.subtitle,
    description: entity.description,
    icon: entity.icon,
    image: entity.image,
    keyPoints: entity.keyPoints,
    items: entity.items,
    sectionName: entity.sectionName,
  };
};
