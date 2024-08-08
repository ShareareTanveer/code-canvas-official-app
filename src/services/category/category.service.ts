import {
  applyPagination,
  listEntities,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import dataSource from '../../configs/orm.config';
import { Category } from '../../entities/category/category.entity';
import {
  CreateCategoryDTO,
  CategoryResponseDTO,
  UpdateCategoryDTO,
} from '../dto/category/category.dto';
import { toCategoryResponseDTO } from './mapper/category.mapper';
import { IBaseQueryParams } from 'common.interface';

const repository = dataSource.getRepository(Category);

const getById = async (id: number): Promise<CategoryResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Category not found');
  }
  return toCategoryResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'category', {
    searchFields: ['name'],
    validSortBy: ['name', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toCategoryResponseDTO);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toCategoryResponseDTO);
  return { response };
};

const create = async (
  params: CreateCategoryDTO,
): Promise<CategoryResponseDTO> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toCategoryResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateCategoryDTO,
): Promise<CategoryResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Category not found');
  }
  entity.name = params.name;
  const updatedEntity = await repository.save(entity);
  return toCategoryResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Category not found');
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
