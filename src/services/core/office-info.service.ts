import dataSource from '../../configs/orm.config';
import { OfficeInfo } from '../../entities/core/office-info.entity';
import {
  CreateOfficeInfoDTO,
  OfficeInfoResponseDTO,
  UpdateOfficeInfoDTO,
} from '../dto/core/office-info.dto';
import { toOfficeInfoResponseDTO } from './mapper/office-info.mapper';

const repository = dataSource.getRepository(OfficeInfo);

const getById = async (id: number): Promise<OfficeInfoResponseDTO> => {
  const entity = await repository.findOne({ where: { id }});
  if (!entity) {
    throw new Error('Office Info not found');
  }
  return toOfficeInfoResponseDTO(entity);
};

const list = async (): Promise<OfficeInfoResponseDTO[]> => {
  const entities = await repository.find();
  return entities.map(toOfficeInfoResponseDTO);
};

const create = async (
  params: CreateOfficeInfoDTO,
): Promise<OfficeInfoResponseDTO> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toOfficeInfoResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateOfficeInfoDTO,
): Promise<OfficeInfoResponseDTO> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Office Info not found');
  }
  
  Object.assign(entity, {
    phone: params.phone ?? entity.phone,
    supportEmail: params.supportEmail ?? entity.supportEmail,
    officialEmail: params.supportEmail ?? entity.officialEmail,
    supportPhone: params.supportPhone ?? entity.supportPhone,
    ownerName: params.ownerName ?? entity.ownerName,
    brandName: params.brandName ?? entity.brandName,
    workingDayAndTime: params.workingDayAndTime ?? entity.workingDayAndTime,
    closedDay: params.closedDay ?? entity.closedDay,
    bin: params.bin ?? entity.bin,
    hotline: params.hotline ?? entity.hotline,
    officeAddress: params.officeAddress ?? entity.officeAddress,
    secondaryOfficeAddress: params.secondaryOfficeAddress ?? entity.secondaryOfficeAddress,
    latitude: params.latitude ?? entity.latitude,
    longitude: params.longitude ?? entity.longitude,
  });

  const updatedEntity = await repository.save(entity);
  return toOfficeInfoResponseDTO(updatedEntity);
};

const remove = async (id: number): Promise<void> => {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new Error('Office Info not found');
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
