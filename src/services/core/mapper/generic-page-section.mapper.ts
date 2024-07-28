import { GenericPageSection } from '../../../entities/core/generic-page-section.entity';
import { GenericPageSectionResponseDTO } from '../../dto/core/generic-page-section.dto';

export const toGenericPageSectionResponseDTO = (
  entity: GenericPageSection,
): GenericPageSectionResponseDTO => {
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
