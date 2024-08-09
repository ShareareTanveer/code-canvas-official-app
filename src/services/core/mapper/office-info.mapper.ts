import { IOfficeInfoResponse } from 'core/office-info.interface';
import { OfficeInfo } from '../../../entities/core/office-info.entity';

export const toIOfficeInfoResponse = (
  entity: OfficeInfo,
): IOfficeInfoResponse => {
  return {
    id: entity.id,
    phone: entity.phone,
    supportEmail: entity.supportEmail,
    officialEmail: entity.officialEmail,
    supportPhone: entity.supportPhone,
    ownerName: entity.ownerName,
    brandName: entity.brandName,
    workingDayAndTime: entity.workingDayAndTime,
    closedDay: entity.closedDay,
    bin: entity.bin,
    hotline: entity.hotline,
    officeAddress: entity.officeAddress,
    secondaryOfficeAddress: entity.secondaryOfficeAddress,
    latitude: entity.latitude,
    longitude: entity.longitude,
    linkedIn: entity.linkedIn,
    instagram: entity.instagram,
    facebook: entity.facebook,
    twitter: entity.twitter,
  };
};
