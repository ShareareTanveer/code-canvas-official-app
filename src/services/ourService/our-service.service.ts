import dataSource from '../../configs/orm.config';
import { OurService } from '../../entities/ourService/our-service.entity';
import { OurServiceImage } from '../../entities/ourService/our-service-image.entity';
import { OurServiceFAQ } from '../../entities/ourService/our-service-faq.entity';
import { In, Not } from 'typeorm';
import { IBaseQueryParams } from 'common.interface';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import {
  deleteFromCloud,
  uploadOnCloud,
} from '../../utilities/cloudiary.utility';
import {
  IOurServiceDetailResponse,
  ICreateOurService,
  IUpdateOurService,
} from 'ourService/our-service.interface';
import {
  toIOurServiceDetailResponse,
  toIOurServiceResponse,
} from './mapper/our-service.mapper';
import { Category } from '../../entities/category/category.entity';

const repository = dataSource.getRepository(OurService);
const faqRepository = dataSource.getRepository(OurServiceFAQ);
const imageRepository = dataSource.getRepository(OurServiceImage);
const categoryRepository = dataSource.getRepository(Category);

const getById = async (
  id: number,
): Promise<IOurServiceDetailResponse> => {
  const entity = await repository.findOne({
    where: {
      id,
    },
    relations: [
      'images',
      'faqs',
      'category',
    ],
  });
  
  if (!entity) {
    throw new Error('OurService not found or clientId mismatch');
  }

  const relatedServices = await repository.find({
    where: {
      category: entity.category,
      id: Not(id),
    },
    take: 4,
    relations: ['images'],
  });

  const relatedBlogResponses = relatedServices.map((blog) =>
    toIOurServiceResponse(blog),
  );
  return toIOurServiceDetailResponse(entity, relatedBlogResponses);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'ourservice', {
    searchFields: ['title', 'subtitle', 'slug'],
    validSortBy: ['title', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo.leftJoinAndSelect('ourservice.category', 'category');
  repo.leftJoinAndSelect('ourservice.images', 'images');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIOurServiceResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIOurServiceResponse);
  return { response };
};

const create = async (
  params: ICreateOurService,
): Promise<IOurServiceDetailResponse> => {
  const service = new OurService();
  service.title = params.title;
  service.subtitle = params.subtitle;
  service.slug = params.slug;
  service.description = params.description;
  service.icon = params.icon || '';
  service.keyPoints = params.keyPoints || [];
  if (params.price !== undefined) service.price = params.price;
  if (params.content !== undefined) service.content = params.content;
  if (params.contentTitle !== undefined)
    service.contentTitle = params.contentTitle;
  if (params.faqs && params.faqs.length > 0) {
    service.faqs = params.faqs.map((data) => {
      const faq = new OurServiceFAQ();
      faq.question = data.question;
      faq.answer = data.answer;
      return faq;
    });
  }

  if (params.category) {
    const category = await categoryRepository.findOne({
      where: { id: params.category },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    service.category = category;
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
  return toIOurServiceDetailResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateOurService,
): Promise<IOurServiceDetailResponse> => {
  const service = await repository.findOne({
    where: { id },
    relations: ['images', 'faqs', 'category'],
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
  if (params.price !== undefined) service.price = params.price;
  if (params.content !== undefined) service.content = params.content;
  if (params.contentTitle !== undefined)
    service.contentTitle = params.contentTitle;

  if (params.category) {
    const category = await categoryRepository.findOne({
      where: { id: params.category },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    service.category = category;
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
      const newImages = validResults.map((result) => {
        const image = new OurServiceImage();
        image.image = result.secure_url;
        image.cloudinary_image_public_id = result.public_id;
        return image;
      });
      service.images.push(...newImages);
    }
  }

  if (params.deleteImages && params.deleteImages.length > 0) {
    const imageEntities = await imageRepository.find({
      where: { id: In(params.deleteImages), service: { id } },
      relations: ['service'],
    });
    service.images = service.images.filter(
      (image) => !params.deleteImages.includes(image.id),
    );
    const deletePromises = imageEntities.map((image) => {
      if (image.cloudinary_image_public_id) {
        return deleteFromCloud(image.cloudinary_image_public_id);
      }
      return Promise.resolve();
    });
    await Promise.all(deletePromises);
    await imageRepository.remove(imageEntities);
  }

  if (params.addFaqs && params.addFaqs.length > 0) {
    const newFaqs = params.addFaqs.map((result) => {
      const faq = new OurServiceFAQ();
      faq.answer = result.answer;
      faq.question = result.question;
      return faq;
    });
    service.faqs = [...service.faqs, ...newFaqs];
  }

  if (params.deleteFaqs && params.deleteFaqs.length > 0) {
    service.faqs = service.faqs.filter(
      (faq) => !params.deleteFaqs.includes(faq.id),
    );

    const faqEntities = await faqRepository.findBy({
      id: In(params.deleteFaqs),
    });
    await faqRepository.remove(faqEntities);
  }

  const savedEntity = await repository.save(service);
  return toIOurServiceDetailResponse(savedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['images'],
  });
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
