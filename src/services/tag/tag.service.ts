import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import dataSource from '../../configs/orm.config';
import { Tag } from '../../entities/tag/tag.entity';
import { toITagResponse } from './mapper/tag.mapper';
import { IBaseQueryParams } from 'common.interface';
import { ITagResponse, ICreateTag, IUpdateTag } from 'tag/tag.interface';

const repository = dataSource.getRepository(Tag);

const getById = async (id: number): Promise<ITagResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Tag not found');
  }
  return toITagResponse(entity);
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
    const response = entities.map(toITagResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toITagResponse);
  return { response };
};

const create = async (
  params: ICreateTag,
): Promise<ITagResponse> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toITagResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateTag,
): Promise<ITagResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Tag not found');
  }
  entity.name = params.name;
  const updatedEntity = await repository.save(entity);
  return toITagResponse(updatedEntity);
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
