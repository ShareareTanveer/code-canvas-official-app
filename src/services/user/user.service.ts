import dataSource from '../../configs/orm.config';
import { StringError } from '../../errors/string.error';
import { Role } from '../../entities/user/role.entity';
import { User } from '../../entities/user/user.entity';
import { UserDetail } from '../../entities/user/userDetails.entity';
import ApiUtility from '../../utilities/api.utility';
import Encryption from '../../utilities/encryption.utility';
import {
  applyPagination,
  listEntitiesUtill,
} from '../../utilities/pagination-filtering.utility';
import { toIUserResponse } from './mapper/user.mapper';
import {
  IBaseQueryParams,
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';
import {
  deleteFromCloud,
  uploadOnCloud,
} from '../../utilities/cloudiary.utility';
import {
  ICreateUser,
  IRegisterUser,
  ISimpleUserResponse,
  IUpdateUser,
  IUpdateUserByAdmin,
} from 'user/user.interface';
import { ILogin } from 'auth/auth.interface';

const register = async (
  params: IRegisterUser,
): Promise<ISimpleUserResponse> => {
  const role = await dataSource.getRepository(Role).findOne({
    where: { name: 'User' },
  });

  if (!role) {
    throw new Error(`User Role not found`);
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  const user = new User();
  user.email = params.email;
  user.password = await Encryption.generateHash(params.password, 10);
  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.role = role;

  const userDetail = new UserDetail();
  userDetail.phone = params.phone;
  userDetail.address = params.address;
  userDetail.gender = params.gender;

  if (imageUrl) userDetail.image = imageUrl;
  if (imageUrl)
    userDetail.cloudinary_image_public_id = cloudiaryPublicId;

  user.details = userDetail;

  const savedUser = await dataSource.getRepository(User).save(user);
  return toIUserResponse(savedUser);
};

const create = async (
  params: ICreateUser,
): Promise<ISimpleUserResponse> => {
  const role = await dataSource.getRepository(Role).findOne({
    where: { id: params.role },
  });

  if (!role) {
    throw new Error(`Role with ID ${params.role} not found`);
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  const user = new User();
  user.email = params.email;
  user.password = await Encryption.generateHash(params.password, 10);
  user.firstName = params.firstName;
  user.lastName = params.lastName;
  user.role = role;

  const userDetail = new UserDetail();
  userDetail.phone = params.phone;
  userDetail.address = params.address;
  userDetail.gender = params.gender;

  if (imageUrl) userDetail.image = imageUrl;
  if (imageUrl)
    userDetail.cloudinary_image_public_id = cloudiaryPublicId;

  user.details = userDetail;

  const savedUser = await dataSource.getRepository(User).save(user);
  return toIUserResponse(savedUser);
};

const login = async (params: ILogin) => {
  const user = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('user.details', 'details')
    .where('user.email = :email', { email: params.email })
    .getOne();

  if (!user) {
    throw new StringError('Your email has not been registered');
  }

  if (await Encryption.verifyHash(params.password, user.password)) {
    return toIUserResponse(user);
  }

  throw new StringError('Your password is not correct');
};

export const verifyEmail = async (params: { email: string }) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: params.email },
  });

  if (!user) {
    throw new StringError('Your email has not been registered');
  }
  user.status = true;

  const savedUser = await dataSource.getRepository(User).save(user);
  return toIUserResponse(savedUser);
};

export const sendResetPasswordEmail = async (params: {
  email: string;
}) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: params.email },
  });
  if (!user) {
    throw new StringError('Your email has not been registered');
  }
  return toIUserResponse(user);
};

export const resetPassword = async (
  email: string,
  hashedPassword: string,
) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  user.password = hashedPassword;
  await userRepository.save(user);
  return true;
};

const getById = async (params: IDetailById) => {
  try {
    const data = await dataSource.getRepository(User).findOne({
      where: { id: params.id },
      relations: ['role'],
    });
    return ApiUtility.sanitizeUser(data);
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { id: params.id },
    relations: ['role', 'details'],
  };

  const user = await dataSource.getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
};

const update = async (params: IUpdateUserByAdmin, id: number) => {
  const userRepository = dataSource.getRepository(User);
  const role = await dataSource.getRepository(Role).findOne({
    where: { id: params.role },
  });

  const user = await userRepository.findOne({
    where: { id },
    relations: ['details'],
  });

  if (!role) {
    throw new Error(`Role with ID ${params.role} not found`);
  }

  if (!user) {
    throw new StringError('User does not exist');
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }

  if (imageUrl && user.details.cloudinary_image_public_id)
    deleteFromCloud(user.details.cloudinary_image_public_id);

  if (params.firstName !== undefined) user.firstName = params.firstName;
  if (params.role !== undefined) user.role = role;
  if (params.lastName !== undefined) user.lastName = params.lastName;
  if (params.phone !== undefined) user.details.phone = params.phone;
  if (params.address !== undefined)
    user.details.address = params.address;
  if (params.gender !== undefined) user.details.gender = params.gender;

  if (imageUrl) user.details.image = imageUrl;
  if (imageUrl)
    user.details.cloudinary_image_public_id = cloudiaryPublicId;

  return await userRepository.save(user);
};

const updateMe = async (params: IUpdateUser, id: number) => {
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id },
    relations: ['details'],
  });
  if (!user) {
    throw new StringError('User does not exist');
  }

  let imageUrl;
  let cloudiaryPublicId;
  if (params.image) {
    const uploadImage = await uploadOnCloud(params.image);
    if (!uploadImage) {
      throw new Error('Image could not be uploaded');
    }
    imageUrl = uploadImage.secure_url;
    cloudiaryPublicId = uploadImage.public_id;
  }
  if (imageUrl && user.details.cloudinary_image_public_id)
    deleteFromCloud(user.details.cloudinary_image_public_id);

  if (params.firstName !== undefined) user.firstName = params.firstName;
  if (params.lastName !== undefined) user.lastName = params.lastName;
  if (params.phone !== undefined) user.details.phone = params.phone;
  if (params.address !== undefined)
    user.details.address = params.address;
  if (params.gender !== undefined) user.details.gender = params.gender;

  if (imageUrl) user.details.image = imageUrl;
  if (imageUrl)
    user.details.cloudinary_image_public_id = cloudiaryPublicId;

  return await userRepository.save(user);
};

const list = async (params: IBaseQueryParams) => {
  const userRepository = dataSource.getRepository(User);

  let repo = await listEntitiesUtill(userRepository, params, 'user', {
    searchFields: ['firstName', 'lastName', 'email', 'details.phone'],
    validSortBy: ['email', 'firstName', 'id'],
    validSortOrder: ['ASC', 'DESC'],
  });

  repo
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('user.details', 'details');

  if (params.pagination == 'true' || params.pagination == 'True') {
    const { repo: paginatedRepo, pagination } = await applyPagination(
      repo,
      params.limit,
      params.page,
    );
    const entities = await paginatedRepo.getMany();
    const response = entities.map(toIUserResponse);
    return { response, pagination };
  }
  const entities = await repo.getMany();
  const response = entities.map(toIUserResponse);
  return { response };
};

const remove = async (params: IDeleteById) => {
  const user = await dataSource
    .getRepository(User)
    .findOne({ where: { id: params.id }, relations: ['details'] });

  if (!user) {
    throw new StringError('User is not existed');
  }

  if (user.details) {
    const userDetail = await dataSource
      .getRepository(UserDetail)
      .findOne({ where: { id: user.details.id } });

    if (!userDetail) {
      throw new StringError('userDetail is not existed');
    }

    return await dataSource
      .getRepository(UserDetail)
      .remove(userDetail);
  }

  return await dataSource.getRepository(User).remove(user);
};

export default {
  register,
  create,
  login,
  getById,
  detail,
  update,
  updateMe,
  list,
  remove,
  sendResetPasswordEmail,
  verifyEmail,
  resetPassword,
};
