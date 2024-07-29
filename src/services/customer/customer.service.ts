import { listEntities } from '../../utilities/pagination-filtering.utility';
import dataSource from '../../configs/orm.config';
import { Customer } from '../../entities/customer/customer.entity';
import {
  CreateCustomerDTO,
  CustomerResponseDTO,
  UpdateCustomerDTO,
} from '../dto/customer/customer.dto';
import { toCustomerResponseDTO } from './mapper/customer.mapper';
import { IBaseQueryParams } from 'common.interface';
import { CustomerCompany } from '../../entities/customer/customer-company-details.entity';
import { CustomerContactPerson } from '../../entities/customer/customer-contact-person.entity';
import { User } from '../../entities/user/user.entity';

const customerRepository = dataSource.getRepository(Customer);
const userRepository = dataSource.getRepository(User);
const companyRepository = dataSource.getRepository(CustomerCompany);
const contactPersonRepository = dataSource.getRepository(
  CustomerContactPerson,
);

const getById = async (id: number): Promise<CustomerResponseDTO> => {
  const entity = await customerRepository.findOne({
    where: { id },
    relations: ['company', 'contactPersons', 'user'],
  });
  if (!entity) {
    throw new Error('Customer not found');
  }
  return toCustomerResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(customerRepository, params, 'customer', {
    relations: ['company', 'contactPersons', 'user'],
    toResponseDTO: toCustomerResponseDTO,
  });
};

const create = async (
  params: CreateCustomerDTO,
): Promise<CustomerResponseDTO> => {
  const user = await userRepository.findOne({
    where: { id: params.user },
  });
  if (!user) {
    throw new Error('user not found');
  }
  const customerEntity = customerRepository.create({
    user: user,
    nidNumber: params.nidNumber,
    passportAttachment: params.passportAttachment,
    photo: params.photo,
    otherAttachment: params.otherAttachment,
  });
  const companyEntity = companyRepository.create(params.company);
  customerEntity.company = await companyRepository.save(companyEntity);
  customerEntity.contactPersons = await Promise.all(
    params.contactPersons.map((person) => {
      const contactPersonEntity =
        contactPersonRepository.create(person);
      return contactPersonRepository.save(contactPersonEntity);
    }),
  );
  const savedEntity = await customerRepository.save(customerEntity);
  return toCustomerResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateCustomerDTO,
): Promise<CustomerResponseDTO> => {
  const entity = await customerRepository.findOne({
    where: { id },
    relations: ['company', 'contactPersons'],
  });
  if (!entity) {
    throw new Error('Customer not found');
  }

  if (params.company) {
    const companyEntity = await companyRepository.findOne({
      where: { id: entity.company.id },
    });
    if (companyEntity) {
      Object.assign(companyEntity, params.company);
      await companyRepository.save(companyEntity);
    }
  }

  if (params.contactPersons) {
    await contactPersonRepository.remove(entity.contactPersons);
    entity.contactPersons = await Promise.all(
      params.contactPersons.map((person) => {
        const contactPersonEntity =
          contactPersonRepository.create(person);
        return contactPersonRepository.save(contactPersonEntity);
      }),
    );
  }

  Object.assign(entity, params);
  const updatedEntity = await customerRepository.save(entity);
  return toCustomerResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await customerRepository.findOne({
    where: { id },
    relations: ['company', 'contactPersons'],
  });
  if (!entity) {
    throw new Error('Customer not found');
  }
  await contactPersonRepository.remove(entity.contactPersons);
  await companyRepository.remove(entity.company);
  await customerRepository.remove(entity);
  return;
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
