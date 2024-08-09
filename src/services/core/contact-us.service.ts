import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { ContactUs } from '../../entities/core/contact-us.entity';
import { toIContactUsResponse } from './mapper/contact-us.mapper';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import {
  IContactUsResponse,
  ICreateContactUs,
  IUpdateContactUs,
} from 'core/contact-us.interface';

const repository = dataSource.getRepository(ContactUs);

const getById = async (id: number): Promise<IContactUsResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ContactUs not found');
  }
  return toIContactUsResponse(entity);
};

const list = async (params: IBaseQueryParams) => {
  let repo = await listEntitiesUtill(repository, params, 'contactus', {
    searchFields: ['email', 'phone'],
    validSortBy: ['email', 'phone', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIContactUsResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIContactUsResponse);
  return { response };
};

const create = async (
  params: ICreateContactUs,
): Promise<IContactUsResponse> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toIContactUsResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateContactUs,
): Promise<IContactUsResponse> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ContactUs not found');
  }

  Object.assign(entity, {
    phone: params.phone ?? entity.phone,
    email: params.email ?? entity.email,
    fullName: params.fullName ?? entity.fullName,
    address: params.address ?? entity.address,
    company: params.company ?? entity.company,
    message: params.message ?? entity.message,
    subject: params.subject ?? entity.subject,
  });

  const updatedEntity = await repository.save(entity);
  return toIContactUsResponse(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ContactUs not found');
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
