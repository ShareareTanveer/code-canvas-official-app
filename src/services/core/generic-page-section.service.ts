import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import {
  CreateGenericPageSectionDTO,
  GenericPageSectionResponseDTO,
  UpdateGenericPageSectionDTO,
} from '../dto/core/generic-page-section.dto';
import { toGenericPageSectionResponseDTO } from './mapper/generic-page-section.mapper';
import { listEntities } from '../../utilities/pagination-filtering.utility';
import {
  deleteFromCloud,
  uploadOnCloud,
} from '../../utilities/cloudiary.utility';

const repository = dataSource.getRepository(GenericPageSection);

const getById = async (
  id: number,
): Promise<GenericPageSectionResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['items'],
  });
  if (!entity) {
    throw new Error('GenericPageSection not found');
  }
  return toGenericPageSectionResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(repository, params, 'genericpagesection', {
    relations: ['items'],
    searchFields: ['title', 'subtitle'],
    validSortBy: ['title', 'id'],
    validSortOrder: ['ASC', 'DESC'],
    toResponseDTO: toGenericPageSectionResponseDTO,
  });
};

const create = async (
  params: CreateGenericPageSectionDTO,
): Promise<GenericPageSectionResponseDTO> => {
  let imageUrl;
  let cloudiaryPublicId;

  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  const entity = new GenericPageSection();
  entity.title = params.title;
  entity.sectionName = params.sectionName;
  entity.subtitle = params.subtitle;
  entity.description = params.description;
  entity.icon = params.icon;
  entity.keyPoints = params.keyPoints;

  if (imageUrl) entity.image = imageUrl;
  if (imageUrl) entity.cloudinary_image_public_id = cloudiaryPublicId;

  const savedEntity = await repository.save(entity);
  return toGenericPageSectionResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateGenericPageSectionDTO,
): Promise<GenericPageSectionResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['items'],
  });
  if (!entity) {
    throw new Error('GenericPageSection not found');
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  if (imageUrl && entity.cloudinary_image_public_id)
    deleteFromCloud(entity.cloudinary_image_public_id);

  if (params.title !== undefined) entity.title = params.title;
  if (params.sectionName !== undefined) entity.sectionName = params.sectionName;
  if (params.subtitle !== undefined) entity.subtitle = params.subtitle;
  if (params.description !== undefined) entity.description = params.description;
  if (params.icon !== undefined) entity.icon = params.icon;
  if (params.keyPoints !== undefined) entity.keyPoints = params.keyPoints;

  if (imageUrl) entity.image = imageUrl;
  if (imageUrl) entity.cloudinary_image_public_id = cloudiaryPublicId;

  const updatedEntity = await repository.save(entity);
  return toGenericPageSectionResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['items'],
  });

  if (!entity) {
    throw new Error('GenericPageSection not found');
  }

  if (entity.cloudinary_image_public_id) {
    await deleteFromCloud(entity.cloudinary_image_public_id);
  }

  for (const item of entity.items) {
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
