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
import { uploadOnCloud } from '../../utilities/cloudiary.utility';

const customerRepository = dataSource.getRepository(Customer);
const userRepository = dataSource.getRepository(User);
const companyRepository = dataSource.getRepository(CustomerCompany);
const contactPersonRepository = dataSource.getRepository(
  CustomerContactPerson,
);

const getById = async (id: number): Promise<CustomerResponseDTO> => {
  const entity = await customerRepository.findOne({
    where: { id },
    relations: ['company', 'contactPerson', 'user'],
  });
  if (!entity) {
    throw new Error('Customer not found');
  }
  return toCustomerResponseDTO(entity);
};

const list = async (params: IBaseQueryParams) => {
  return await listEntities(customerRepository, params, 'customer', {
    relations: ['company', 'contactPerson', 'user'],
    toResponseDTO: toCustomerResponseDTO,
  });
};
const create = async (params: CreateCustomerDTO) => {
  const user = await userRepository.findOne({
    where: { id: params.user },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const uploadFile = async (filePath: string | undefined) => {
    if (filePath) {
      const uploadImage = await uploadOnCloud(filePath);
      if (!uploadImage) {
        throw new Error('File could not be uploaded');
      }
      return {
        url: uploadImage.secure_url,
        publicId: uploadImage.public_id,
      };
    }
    return null;
  };

  const passportAttachment = await uploadFile(
    params.passportAttachment,
  );
  const otherAttachment = await uploadFile(params.otherAttachment);
  const tradeLicenseAttachment = await uploadFile(
    params.company.tradeLicenseAttachment,
  );
  const tinAttachment = await uploadFile(params.company.tinAttachment);
  const logo = await uploadFile(params.company.logo);

  const companyEntity = {
    ...params.company,
    tradeLicenseAttachment: tradeLicenseAttachment?.url,
    tradeLicenseAttachmentPublicId: tradeLicenseAttachment?.publicId,
    tinAttachment: tinAttachment?.url,
    tinAttachmentPublicId: tinAttachment?.publicId,
    logo: logo?.url,
    logoPublicId: logo?.publicId,
  };

  const contactPersonEntity = {
    ...params.contactPerson,
  };

  const customerEntity = {
    user: user,
    nidNumber: params.nidNumber,
    company: companyEntity,
    contactPerson: contactPersonEntity,
    passportAttachment: passportAttachment?.url,
    passportAttachmentPublicId: passportAttachment?.publicId,
    otherAttachment: otherAttachment?.url,
    otherAttachmentPublicId: otherAttachment?.publicId,
  };

  const savedCustomer = await customerRepository.save(customerEntity);
  return toCustomerResponseDTO(savedCustomer);
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
  await contactPersonRepository.remove(entity.contactPerson);
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
