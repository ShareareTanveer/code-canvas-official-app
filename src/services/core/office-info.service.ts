import { IOfficeInfoResponse, ICreateOfficeInfo, IUpdateOfficeInfo } from 'core/office-info.interface';
import dataSource from '../../configs/orm.config';
import { OfficeInfo } from '../../entities/core/office-info.entity';
import { toIOfficeInfoResponse } from './mapper/office-info.mapper';

const repository = dataSource.getRepository(OfficeInfo);

const getById = async (id: number): Promise<IOfficeInfoResponse> => {
  const entity = await repository.findOne({ where: { id }});
  if (!entity) {
    throw new Error('Office Info not found');
  }
  return toIOfficeInfoResponse(entity);
};

const list = async (): Promise<IOfficeInfoResponse[]> => {
  const entities = await repository.find();
  return entities.map(toIOfficeInfoResponse);
};

const create = async (
  params: ICreateOfficeInfo,
): Promise<IOfficeInfoResponse> => {
  const entity = repository.create(params);
  const savedEntity = await repository.save(entity);
  return toIOfficeInfoResponse(savedEntity);
};

const update = async (
  id: number,
  params: IUpdateOfficeInfo,
): Promise<IOfficeInfoResponse> => {
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
  return toIOfficeInfoResponse(updatedEntity);
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
