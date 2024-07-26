import dataSource from '../../configs/orm.config';
import { User } from '../../entities/user/user.entity';
import { Permission } from '../../entities/user/permission.entity';
import { Role } from '../../entities/user/role.entity';
import { CreateRoleDTO, RoleResponseDTO, UpdateRoleDTO } from '../dto/auth/role.dto';
import { toRoleResponseDTO } from './mapper/role.mapper';
import { In } from 'typeorm';
import { StringError } from '../../errors/string.error';

const roleRepository = dataSource.getRepository(Role);
const permissionRepository = dataSource.getRepository(Permission);
const userRepository = dataSource.getRepository(User);

const create = async (
  params: CreateRoleDTO,
): Promise<RoleResponseDTO> => {
  const { name, permissions, users } = params;
  const role = new Role();
  role.name = name;

  if (permissions) {
    const permissionEntities =
      await permissionRepository.findBy({ id: In(permissions) })
    role.permissions = permissionEntities;
  }

  if (users) {
    const userEntities = await userRepository.findBy({ id: In(users) });
    role.users = userEntities;
  }

  const savedEntity = await roleRepository.save(role);
  return toRoleResponseDTO(savedEntity);
};

const update = async (
  id: number,
  params: UpdateRoleDTO,
): Promise<RoleResponseDTO> => {
  const { name, permissions, users } = params;
  const role = await roleRepository.findOne({
    where: { id: id },
    relations: ['permissions', 'users'],
  });
  if (!role) {
    throw new Error('Role not found');
  }

  if (name) {
    role.name = name;
  }

  if (permissions) {
    const permissionEntities =
      await permissionRepository.findBy({ id: In(permissions) })
    role.permissions = permissionEntities;
  }

  if (users) {
    const userEntities = await userRepository.findBy({ id: In(users) })
    role.users = userEntities;
  }

  const savedEntity = await roleRepository.save(role);
  return toRoleResponseDTO(savedEntity);
};

const list = async () => {
  const entities = await roleRepository.find({
    relations: ['permissions', 'users'],
  });
  return entities.map(toRoleResponseDTO);
};

const detail = async (params: {id: number}) => {
  const query = {
    where: { id: params.id },
    relations: ['permissions', 'users'],
  };

  const role = await dataSource.getRepository(Role).findOne(query);
  if (!role) {
    throw new StringError('User is not existed');
  }

  return toRoleResponseDTO(role);
};

const remove = async (params: {id: number}) => {
  const role = await dataSource
    .getRepository(Role)
    .findOne({ where: { id: params.id }, relations: ['users','permissions'] });

    if (!role) {
      throw new StringError('Role is not existed');
    }
  return await dataSource.getRepository(Role).remove(role);
};

export default {
  create,
  list,
  detail,
  update,
  remove,
};
