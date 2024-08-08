import {
  applyPagination,
  listEntities,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import dataSource from '../../configs/orm.config';
import { Tag } from '../../entities/tag/tag.entity';
import {
  CreateTagDTO,
  TagResponseDTO,
  UpdateTagDTO,
} from '../dto/tag/tag.dto';
import { toTagResponseDTO } from './mapper/tag.mapper';
import { IBaseQueryParams } from 'common.interface';
import { toOrderResponseDTO } from '../order/mapper/order.mapper';

const repository = dataSource.getRepository(Tag);

const getById = async (id: number): Promise<TagResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Tag not found');
  }
  return toTagResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'tag', {
    searchFields: [
      'name',
      'products.title',
      'products.slug',
      'products.category.name',
    ],
    validSortBy: ['name', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo.leftJoinAndSelect('tag.products', 'products');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toTagResponseDTO);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toTagResponseDTO);
  return { response };
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
  const entity = await repository.findOne({ where: { id } });
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
  remove,
};
