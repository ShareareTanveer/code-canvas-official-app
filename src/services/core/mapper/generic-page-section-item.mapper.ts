import { GenericPageSectionItem } from '../../../entities/core/generic-page-section-item.entity';
import { GenericPageSectionItemResponseDTO } from '../../dto/core/generic-page-section-item.dto';

export const toGenericPageSectionItemResponseDTO = (
  entity: GenericPageSectionItem,
): GenericPageSectionItemResponseDTO => {
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
