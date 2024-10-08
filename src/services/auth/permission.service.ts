import { ICreatePermission, IUpdatePermission } from 'auth/permission.interface';
import dataSource from '../../configs/orm.config';
import { Permission } from '../../entities/user/permission.entity';

const create = async (
  params: ICreatePermission,
): Promise<Permission> => {
  const data: ICreatePermission = {
    name: params.name,
    codename: params.codename,
    entity_name: params.entity_name,
  };
  const permissionRepository = dataSource.getRepository(Permission);
  return await permissionRepository.save(data);
};

const update = async (
  id: number,
  params: Partial<IUpdatePermission>,
): Promise<Permission> => {
  const permissionRepository = dataSource.getRepository(Permission);
  const existingPermission = await permissionRepository.findOneBy({
    id,
  });
  if (!existingPermission) {
    throw new Error(`Permission with id ${id} not found`);
  }
  if (params.name !== undefined) {
    existingPermission.name = params.name;
  }
  if (params.codename !== undefined) {
    existingPermission.codename = params.codename;
  }
  if (params.entity_name !== undefined) {
    existingPermission.entity_name = params.entity_name;
  }
  return await permissionRepository.save(existingPermission);
};

const list = async () => {
  const permissionRepository = dataSource.getRepository(Permission);
  return await permissionRepository.find();
};

export default {
  create,
  list,
  update,
};
