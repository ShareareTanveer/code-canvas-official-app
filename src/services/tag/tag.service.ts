import dataSource from '../../configs/orm.config';
import { Tag } from '../../entities/tag/tag.entity';
import { CreateTagDTO, TagResponseDTO, UpdateTagDTO } from '../dto/tag/tag.dto';
import { toTagResponseDTO } from './mapper/tag.mapper';

const repository = dataSource.getRepository(Tag);

const getById = async (id: number): Promise<TagResponseDTO> => {
  const entity = await repository.findOne({where: {id}});
  if (!entity) {
    throw new Error('Tag not found',);
  }
  return toTagResponseDTO(entity);
};

const list = async (): Promise<TagResponseDTO[]> => {
  const entities = await repository.find();
  return entities.map(toTagResponseDTO);
};

const create = async (
  params: CreateTagDTO,
): Promise<TagResponseDTO> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toTagResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateTagDTO,
): Promise<TagResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Tag not found');
  }
  entity.name = params.name;
  const updatedEntity = await repository.save(entity);
  return toTagResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({where: {id}});
  if (!entity) {
    throw new Error('Tag not found');
  }
  await repository.remove(entity);
  return;
};

export default {
  getById,
  list,
  create,
  update,
  remove
};
