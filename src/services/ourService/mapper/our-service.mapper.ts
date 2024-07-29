import { OurServiceDetailResponseDTO, OurServiceResponseDTO } from '../../../services/dto/ourService/our-service.dto';
import { OurService } from '../../../entities/ourService/our-service.entity';

export const toOurServiceResponseDTO = (
  entity: OurService,
): OurServiceResponseDTO => {
  return {
    id: entity.id,
    subtitle: entity.subtitle,
    title: entity.title,
    slug: entity.slug,
    icon: entity.icon,
    images: entity.images,
  };
};

export const toOurServiceDetailResponseDTO = (
  entity: OurService,
): OurServiceDetailResponseDTO => {
  return {
    id: entity.id,
    subtitle: entity.subtitle,
    title: entity.title,
    slug: entity.slug,
    icon: entity.icon,
    images: entity.images,
    description: entity.description,
    keyPoints: entity.keyPoints,
    faqs: entity.faqs,
  };
};
