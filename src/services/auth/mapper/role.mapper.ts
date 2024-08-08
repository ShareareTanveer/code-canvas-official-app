import { IRoleResponse } from 'auth/role.interface';
import { Role } from '../../../entities/user/role.entity';

export const toIRoleResponse = (entity: Role): IRoleResponse => {
  return {
    id: entity.id,
    name: entity.name,
    permissions: entity.permissions,
    users: entity.users,
  };
};
