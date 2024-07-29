import dataSource from '../../configs/orm.config';
import {
  CreateOurServiceDTO,
  OurServiceDetailResponseDTO,
  OurServiceResponseDTO,
  UpdateOurServiceDTO,
} from '../dto/ourService/our-service.dto';
import { OurService } from '../../entities/ourService/our-service.entity';
import {
  toOurServiceDetailResponseDTO,
  toOurServiceResponseDTO,
} from './mapper/our-service.mapper';
import { OurServiceImage } from '../../entities/ourService/our-service-image.entity';
import { OurServiceFAQ } from '../../entities/ourService/our-service-faq.entity';
import { In } from 'typeorm';

const repository = dataSource.getRepository(OurService);
const faqRepository = dataSource.getRepository(OurServiceFAQ);
const imageRepository = dataSource.getRepository(OurServiceImage);

const getById = async (
  id: number,
): Promise<OurServiceDetailResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images', 'faqs'],
  });
  if (!entity) {
    throw new Error('OurService not found');
  }
  return toOurServiceDetailResponseDTO(entity);
};

const list = async (): Promise<OurServiceResponseDTO[]> => {
  const entities = await repository.find({ relations: ['images'] });
  return entities.map(toOurServiceResponseDTO);
};

const create = async (
  params: CreateOurServiceDTO,
): Promise<OurServiceDetailResponseDTO> => {
  const product = new OurService();
  product.title = params.title;
  product.subtitle = params.subtitle;
  product.slug = params.slug;
  product.description = params.description;
  product.icon = params.icon || '';
  product.keyPoints = params.keyPoints || [];

  if (params.images && params.images.length > 0) {
    product.images = params.images.map((url) => {
      const image = new OurServiceImage();
      image.image = url;
      return image;
    });
  }

  if (params.faqs && params.faqs.length > 0) {
    product.faqs = params.faqs.map((data) => {
      const faq = new OurServiceFAQ();
      faq.question = data.question;
      faq.answer = data.answer;
      return faq;
    });
  }

  const savedEntity = await repository.save(product);
  return toOurServiceDetailResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateOurServiceDTO,
): Promise<OurServiceDetailResponseDTO> => {
  const product = await repository.findOne({
    where: { id },
    relations: ['images', 'faqs'],
  });

  if (!product) {
    throw new Error(`OurService with ID ${id} not found`);
  }
  if (params.title !== undefined) product.title = params.title;
  if (params.subtitle !== undefined) product.subtitle = params.subtitle;
  if (params.slug !== undefined) product.slug = params.slug;
  if (params.description !== undefined)
    product.description = params.description;
  if (params.icon !== undefined) product.icon = params.icon;
  if (params.keyPoints !== undefined)
    product.keyPoints = params.keyPoints;

  if (params.images && params.images.length > 0) {
    const imageEntities = await imageRepository.findBy({
      id: In(params.images.map((image) => image.id)),
    });

    product.images = imageEntities.map((imageEntity) => {
      const matchingImage = params.images.find(
        (image) => image.id === imageEntity.id,
      );
      if (matchingImage) {
        imageEntity.image = matchingImage.image;
      }
      return imageEntity;
    });
  }

  if (params.faqs && params.faqs.length > 0) {
    const faqsEntities = await faqRepository.findBy({
      id: In(params.faqs.map((faq) => faq.id)),
    });

    product.faqs = faqsEntities.map((faqEntity) => {
      const matchingFaq = params.faqs.find(
        (faq) => faq.id === faqEntity.id,
      );
      if (matchingFaq) {
        faqEntity.question = matchingFaq.question;
        faqEntity.answer = matchingFaq.answer;
      }
      return faqEntity;
    });
  }
  const savedEntity = await repository.save(product);
  return toOurServiceDetailResponseDTO(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('OurService not found');
  }
  await repository.remove(entity);
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
