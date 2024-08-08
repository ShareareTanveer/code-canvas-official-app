import { ISimpleUserResponse } from 'user/user.interface';
import { User } from '../../../entities/user/user.entity';

export const toIUserResponse = (
  entity: User,
): ISimpleUserResponse => {
  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    details: entity.details,
    role: entity.role,
    status: entity.status,
    customer: entity.customer,
  };
};
