import { OurService } from '../../../entities/ourService/our-service.entity';
import { IOurServiceResponse, IOurServiceDetailResponse } from 'ourService/our-service.interface';

export const toIOurServiceResponse = (
  entity: OurService,
): IOurServiceResponse => {
  return {
    id: entity.id,
    subtitle: entity.subtitle,
    title: entity.title,
    slug: entity.slug,
    icon: entity.icon,
    images: entity.images,
  };
};

export const toIOurServiceDetailResponse = (
  entity: OurService,
): IOurServiceDetailResponse => {
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
