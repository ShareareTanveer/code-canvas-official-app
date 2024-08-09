import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { GenericPageSectionItem } from '../../entities/core/generic-page-section-item.entity';
import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import { toIGenericPageSectionItemResponse } from './mapper/generic-page-section-item.mapper';
import { applyPagination, listEntitiesUtill } from '../../utilities/pagination-filtering.utility';
import { deleteFromCloud, uploadOnCloud } from '../../utilities/cloudiary.utility';
import { ICreateGenericPageSectionItem, IGenericPageSectionItemResponse, IUpdateGenericPageSectionItem } from 'core/generic-page-section-item.interface';

const repository = dataSource.getRepository(GenericPageSectionItem);
const sectionRepository = dataSource.getRepository(GenericPageSection);

const getById = async (
  id: number,
): Promise<IGenericPageSectionItemResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['genericPageSection'],
  });
  if (!entity) {
    throw new Error('GenericPageSectionItem not found');
  }
  return toIGenericPageSectionItemResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'genericpagesectionitem', {
    searchFields: ['title', 'subtitle'],
    validSortBy: ['title', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('genericpagesectionitem.genericPageSection', 'genericPageSection')

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIGenericPageSectionItemResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIGenericPageSectionItemResponse);
  return { response };
};

const create = async (
  params: ICreateGenericPageSectionItem,
): Promise<IGenericPageSectionItemResponse> => {
  const section = await sectionRepository.findOne({
    where: { id: params.genericPageSection },
  });
  if (!section) {
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

  const entity = new GenericPageSectionItem();
  entity.title = params.title;
  entity.subtitle = params.subtitle;
  entity.description = params.description;
  entity.icon = params.icon;
  entity.genericPageSection = section;
  entity.keyPoints = params.keyPoints;

  if (imageUrl) entity.image = imageUrl;
  if (imageUrl) entity.cloudinary_image_public_id = cloudiaryPublicId;

  const savedEntity = await repository.save(entity);
  return toIGenericPageSectionItemResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateGenericPageSectionItem,
): Promise<IGenericPageSectionItemResponse> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['genericPageSection'],
  });
  if (!entity) {
    throw new Error('GenericPageSectionItem not found');
  }

  if (params.genericPageSection) {
    const section = await sectionRepository.findOne({
      where: { id: params.genericPageSection },
    });
    if (!section) {
      throw new Error('GenericPageSection not found');
    }
    entity.genericPageSection = section;
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
  if (params.subtitle !== undefined) entity.subtitle = params.subtitle;
  if (params.description !== undefined) entity.description = params.description;
  if (params.icon !== undefined) entity.icon = params.icon;
  if (params.keyPoints !== undefined) entity.keyPoints = params.keyPoints;

  if (imageUrl) entity.image = imageUrl;
  if (imageUrl) entity.cloudinary_image_public_id = cloudiaryPublicId;

  const updatedEntity = await repository.save(entity);
  return toIGenericPageSectionItemResponse(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('GenericPageSectionItem not found');
  }
  if (entity.cloudinary_image_public_id) {
    await deleteFromCloud(entity.cloudinary_image_public_id);
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
