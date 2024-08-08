import { IBaseQueryParams } from 'common.interface';
import dataSource from '../../configs/orm.config';
import { ContactUs } from '../../entities/core/contact-us.entity';
import {
  CreateContactUsDTO,
  ContactUsResponseDTO,
  UpdateContactUsDTO,
} from '../dto/core/contact-us.dto';
import { toContactUsResponseDTO } from './mapper/contact-us.mapper';
import {
  applyPagination,
  listEntities,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import { toOrderResponseDTO } from '../order/mapper/order.mapper';

const repository = dataSource.getRepository(ContactUs);

const getById = async (id: number): Promise<ContactUsResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('ContactUs not found');
  }
  return toContactUsResponseDTO(entity);
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
    const response = entities.map(toContactUsResponseDTO);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toContactUsResponseDTO);
  return { response };
};

const create = async (
  params: CreateContactUsDTO,
): Promise<ContactUsResponseDTO> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toContactUsResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateContactUsDTO,
): Promise<ContactUsResponseDTO> => {
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
  return toContactUsResponseDTO(updatedEntity);
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
