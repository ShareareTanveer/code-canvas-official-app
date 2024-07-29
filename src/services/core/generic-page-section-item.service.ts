import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { GenericPageSectionItem } from '../../entities/core/generic-page-section-item.entity';
import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import {
  CreateGenericPageSectionItemDTO,
  GenericPageSectionItemResponseDTO,
  UpdateGenericPageSectionItemDTO,
} from '../dto/core/generic-page-section-item.dto';
import { toGenericPageSectionItemResponseDTO } from './mapper/generic-page-section-item.mapper';
import { listEntities } from '../../utilities/pagination-filtering.utility';

const repository = dataSource.getRepository(GenericPageSectionItem);
const sectionRepository = dataSource.getRepository(GenericPageSection);

const getById = async (
  id: number,
): Promise<GenericPageSectionItemResponseDTO> => {
  const entity = await repository.findOne({
    where: { id },
    relations: ['genericPageSection'],
  });
  if (!entity) {
    throw new Error('GenericPageSectionItem not found');
  }
  return toGenericPageSectionItemResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(
    repository,
    params,
    'genericpagesectionitem',
    {
      relations: ['genericPageSection'],
      searchFields: ['title', 'subtitle'],
      validSortBy: ['title', 'id'],
      validSortOrder: ['ASC', 'DESC'],
      toResponseDTO: toGenericPageSectionItemResponseDTO,
    },
  );
};

const create = async (
  params: CreateGenericPageSectionItemDTO,
): Promise<GenericPageSectionItemResponseDTO> => {
  const section = await sectionRepository.findOne({
    where: { id: params.genericPageSection },
  });
  if (!section) {
    throw new Error('GenericPageSection not found');
  }
  const entity = repository.create({
    ...params,
    genericPageSection: section,
  });
  const savedEntity = await repository.save(entity);
  return toGenericPageSectionItemResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateGenericPageSectionItemDTO,
): Promise<GenericPageSectionItemResponseDTO> => {
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

  Object.assign(entity, {
    title: params.title ?? entity.title,
    subtitle: params.subtitle ?? entity.subtitle,
    keyPoints: params.keyPoints ?? entity.keyPoints,
    description: params.description ?? entity.description,
    icon: params.icon ?? entity.icon,
    image: params.image ?? entity.image,
  });

  const updatedEntity = await repository.save(entity);
  return toGenericPageSectionItemResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('GenericPageSectionItem not found');
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
