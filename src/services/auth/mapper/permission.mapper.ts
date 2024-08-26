import { Permission } from '../../../entities/user/permission.entity';

export const toPermissionResponseDTO = (
  entity: Permission,
): any => {
  return {
    id: entity.id,
    name: entity.name,
    codename: entity.codename,
    entity_name: entity.entity_name,
  };
};
