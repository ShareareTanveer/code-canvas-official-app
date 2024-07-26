import { Role } from '../../../entities/user/role.entity';
import { RoleResponseDTO } from '../../../services/dto/auth/role.dto';

export const toRoleResponseDTO = (entity: Role): RoleResponseDTO => {
  return {
    id: entity.id,
    name: entity.name,
    permissions: entity.permissions,
    users: entity.users,
  };
};
