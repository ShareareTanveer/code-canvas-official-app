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
import { IBaseQueryParams } from 'common.interface';
import { listEntities } from '../../utilities/pagination-filtering.utility';
import {
  deleteFromCloud,
  uploadMultipleOnCloud,
  uploadOnCloud,
} from '../../utilities/cloudiary.utility';

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

const list = async (params: IBaseQueryParams) => {
  return await listEntities(repository, params, 'ourservice', {
    relations: ['images'],
    searchFields: ['title', 'subtitle', 'slug'],
    validSortBy: ['title', 'id'],
    validSortOrder: ['ASC', 'DESC'],
    toResponseDTO: toOurServiceResponseDTO,
  });
};

const create = async (
  params: CreateOurServiceDTO,
): Promise<OurServiceDetailResponseDTO> => {
  const service = new OurService();
  service.title = params.title;
  service.subtitle = params.subtitle;
  service.slug = params.slug;
  service.description = params.description;
  service.icon = params.icon || '';
  service.keyPoints = params.keyPoints || [];
  if (params.faqs && params.faqs.length > 0) {
    service.faqs = params.faqs.map((data) => {
      const faq = new OurServiceFAQ();
      faq.question = data.question;
      faq.answer = data.answer;
      return faq;
    });
  }

  if (params.images && params.images.length > 0) {
    const uploadPromises = params.images.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);

    const validResults = uploadResults.filter(
      (result) => result !== null,
    );

    if (validResults.length > 0) {
      service.images = validResults.map((result) => {
        const image = new OurServiceImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
    } else {
      throw new Error('Failed to upload all images');
    }
  }

  const savedEntity = await repository.save(service);
  return toOurServiceDetailResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateOurServiceDTO,
): Promise<OurServiceDetailResponseDTO> => {
  const service = await repository.findOne({
    where: { id },
    relations: ['images', 'faqs'],
  });

  if (!service) {
    throw new Error(`OurService with ID ${id} not found`);
  }

  if (params.title !== undefined) service.title = params.title;
  if (params.subtitle !== undefined) service.subtitle = params.subtitle;
  if (params.slug !== undefined) service.slug = params.slug;
  if (params.description !== undefined)
    service.description = params.description;
  if (params.icon !== undefined) service.icon = params.icon;
  if (params.keyPoints !== undefined)
    service.keyPoints = params.keyPoints;

  if (params.faqs && params.faqs.length > 0) {
    const faqsEntities = await faqRepository.findBy({
      id: In(params.faqs.map((faq) => faq.id)),
    });

    service.faqs = faqsEntities.map((faqEntity) => {
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

  if (params.addImages && params.addImages.length > 0) {
    const uploadPromises = params.addImages.map((file) =>
      uploadOnCloud(file.path),
    );
    const uploadResults = await Promise.all(uploadPromises);
    const validResults = uploadResults.filter(
      (result) => result !== null,
    );
    if (validResults.length > 0) {
      service.images = validResults.map((result) => {
        const image = new OurServiceImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
    }
  }

  if (params.deleteImages && params.deleteImages.length > 0) {
    const imageEntities = await imageRepository.findBy({
      id: In(params.deleteImages),
    });

    const deletePromises = imageEntities.map((image) => {
      if (image.cloudinary_image_public_id) {
        return deleteFromCloud(image.cloudinary_image_public_id);
      }
    });
    await Promise.all(deletePromises);
    await imageRepository.remove(imageEntities);
  }

  const savedEntity = await repository.save(service);
  return toOurServiceDetailResponseDTO(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id }, relations: ["images"] });
  if (!entity) {
    throw new Error('OurService not found');
  }
  
  for (const item of entity.images) {
    if (item.cloudinary_image_public_id) {
      await deleteFromCloud(item.cloudinary_image_public_id);
    }
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
