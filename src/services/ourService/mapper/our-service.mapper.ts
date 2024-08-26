import { OurService } from '../../../entities/ourService/our-service.entity';
import {
  IOurServiceResponse,
  IOurServiceDetailResponse,
} from 'ourService/our-service.interface';

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
    category: entity.category,
    price: entity.price,
  };
};

export const toIOurServiceDetailResponse = (
  entity: OurService,
  relatedServices?: IOurServiceResponse[],
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
    category: entity.category,
    price: entity.price,
    content: entity.content,
    contentTitle: entity.contentTitle,
    relatedServices: relatedServices,
  };
};
