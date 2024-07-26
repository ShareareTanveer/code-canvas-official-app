import { Permission } from '../../../entities/user/permission.entity';
import { PermissionResponseDTO } from '../../../services/dto/auth/permission.dto';

export const toPermissionResponseDTO = (
  entity: Permission,
): PermissionResponseDTO => {
  return {
    id: entity.id,
    name: entity.name,
    codename: entity.codename,
    entity_name: entity.entity_name,
  };
};
