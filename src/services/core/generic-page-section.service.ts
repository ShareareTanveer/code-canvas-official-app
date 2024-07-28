import dataSource from '../../configs/orm.config';
import { GenericPageSection } from '../../entities/core/generic-page-section.entity';
import {
  CreateGenericPageSectionDTO,
  GenericPageSectionResponseDTO,
  UpdateGenericPageSectionDTO,
} from '../dto/core/generic-page-section.dto';
import { toGenericPageSectionResponseDTO } from './mapper/generic-page-section.mapper';

const repository = dataSource.getRepository(GenericPageSection);

const getById = async (id: number): Promise<GenericPageSectionResponseDTO> => {
  const entity = await repository.findOne({ where: { id }, relations: ['items'] });
  if (!entity) {
    throw new Error('GenericPageSection not found');
  }
  return toGenericPageSectionResponseDTO(entity);
};

const list = async (): Promise<GenericPageSectionResponseDTO[]> => {
  const entities = await repository.find({ relations: ['items'] });
  return entities.map(toGenericPageSectionResponseDTO);
};

const create = async (
  params: CreateGenericPageSectionDTO,
): Promise<GenericPageSectionResponseDTO> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toGenericPageSectionResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateGenericPageSectionDTO,
): Promise<GenericPageSectionResponseDTO> => {
  const entity = await repository.findOne({ where: { id },relations: ['items']  });
  if (!entity) {
    throw new Error('GenericPageSection not found');
  }
  
  Object.assign(entity, {
    title: params.title ?? entity.title,
    subtitle: params.subtitle ?? entity.subtitle,
    description: params.description ?? entity.description,
    icon: params.icon ?? entity.icon,
    image: params.image ?? entity.image,
    keyPoints: params.keyPoints ?? entity.keyPoints,
    sectionName: params.sectionName ?? entity.sectionName,
  });

  const updatedEntity = await repository.save(entity);
  return toGenericPageSectionResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('GenericPageSection not found');
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
