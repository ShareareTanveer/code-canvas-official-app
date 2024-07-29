import { Repository, SelectQueryBuilder } from 'typeorm';
import ApiUtility from './api.utility';

type SortOrder = 'ASC' | 'DESC';

interface QueryParams {
  keyword?: string;
  sortBy?: string;
  sortOrder?: string;
  pagination?: string;
  limit?: number;
  page?: number;
  userId?: number;
  isAdmin?: boolean;
}

const createQueryBuilder = <Entity>(
  repository: Repository<Entity>,
  modelName: string,
  relations: string[],
): SelectQueryBuilder<Entity> => {
  let repo = repository.createQueryBuilder(modelName);
  relations.forEach((relation) => {
    repo = repo.leftJoinAndSelect(`${modelName}.${relation}`, relation);
  });
  return repo;
};

const applyKeywordFilter = <Entity>(
  repo: SelectQueryBuilder<Entity>,
  fields: string[],
  keyword?: string,
): SelectQueryBuilder<Entity> => {
  if (keyword) {
    const searchConditions = fields
      .map((field) => `LOWER(${field}) LIKE LOWER(:keyword)`)
      .join(' OR ');
    repo = repo.andWhere(`(${searchConditions})`, {
      keyword: `%${keyword}%`,
    });
  }
  return repo;
};

const applyIdFilter = <Entity>(
  repo: SelectQueryBuilder<Entity>,
  modelName: string,
  userId?: number,
  isAdmin?: boolean,
): SelectQueryBuilder<Entity> => {
  if (!isAdmin && userId) {
    repo = repo.andWhere(`${modelName}.userId = :userId`, { userId });
  }
  return repo;
};

const applySorting = <Entity>(
  repo: SelectQueryBuilder<Entity>,
  validSortBy: string[],
  validSortOrder: SortOrder[],
  sortBy?: string,
  sortOrder?: string,
): SelectQueryBuilder<Entity> => {
  if (
    sortBy &&
    sortOrder &&
    validSortBy.includes(sortBy) &&
    validSortOrder.includes(sortOrder.toUpperCase() as SortOrder)
  ) {
    repo = repo.orderBy(
      `${sortBy}`,
      sortOrder.toUpperCase() as SortOrder,
    );
  }
  return repo;
};

const applyPagination = async <Entity>(
  repo: SelectQueryBuilder<Entity>,
  limit?: number,
  page?: number,
): Promise<{ repo: SelectQueryBuilder<Entity>; pagination: any }> => {
  if (limit && page !== undefined) {
    const total = await repo.getCount();
    const pagRes = ApiUtility.getPagination(total, limit, page);
    repo = repo.limit(limit).offset(ApiUtility.getOffset(limit, page));
    return { repo, pagination: pagRes.pagination };
  }
  return { repo, pagination: null };
};

interface ListEntitiesOptions<Entity> {
  relations?: string[];
  searchFields?: string[];
  validSortBy?: string[];
  validSortOrder?: SortOrder[];
  toResponseDTO: (entity: Entity) => any;
}

export const listEntities = async <Entity>(
  repository: Repository<Entity>,
  params: QueryParams,
  modelName: string,
  options: ListEntitiesOptions<Entity>,
) => {
  const {
    relations = [],
    searchFields = [],
    validSortBy = [],
    validSortOrder = [],
    toResponseDTO,
  } = options;

  let repo = createQueryBuilder(repository, modelName, relations);
  repo = applyKeywordFilter(repo, searchFields, params.keyword);
  repo = applyIdFilter(repo, modelName, params.userId, params.isAdmin);
  repo = applySorting(
    repo,
    validSortBy,
    validSortOrder,
    params.sortBy,
    params.sortOrder,
  );

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toResponseDTO);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toResponseDTO);
  return { response };
};
