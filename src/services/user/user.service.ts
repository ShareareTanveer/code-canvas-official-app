import dataSource from '../../configs/orm.config';
import { StringError } from '../../errors/string.error';
import { Role } from '../../entities/user/role.entity';
import { User } from '../../entities/user/user.entity';
import { UserDetail } from '../../entities/user/userDetails.entity';
import ApiUtility from '../../utilities/api.utility';
import Encryption from '../../utilities/encryption.utility';
import { generateOTP, verifyOTP } from '../../utilities/otp.utility';
import { listEntities } from '../../utilities/pagination-filtering.utility';
import { loginDTO, verifyEmailOtpDTO } from '../dto/auth/auth.dto';
import { toUserResponseDTO } from './mapper/user.mapper';
import {
  IBaseQueryParams,
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';
import {
  CreateUserDTO,
  RegisterUserDTO,
  SimpleUserResponseDTO,
  UpdateUserByAdminDTO,
  UpdateUserDTO,
} from '../dto/user/user.dto';

const register = async (
  params: RegisterUserDTO,
): Promise<SimpleUserResponseDTO> => {
  const role = await dataSource.getRepository(Role).findOne({
    where: { name: 'User' },
  });

  if (!role) {
    throw new Error(`User Role not found`);
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

  if (params.image) {
    userDetail.image = params.image;
  }

  user.details = userDetail;

  const savedUser = await dataSource.getRepository(User).save(user);
  return toUserResponseDTO(savedUser);
};

const create = async (
  params: CreateUserDTO,
): Promise<SimpleUserResponseDTO> => {
  const role = await dataSource.getRepository(Role).findOne({
    where: { id: params.role },
  });

  if (!role) {
    throw new Error(`Role with ID ${params.role} not found`);
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

  if (params.image) {
    userDetail.image = params.image;
  }

  user.details = userDetail;

  const savedUser = await dataSource.getRepository(User).save(user);
  return toUserResponseDTO(savedUser);
};

const login = async (params: loginDTO) => {
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
    return toUserResponseDTO(user);
  }

  throw new StringError('Your password is not correct');
};

export const sendEmailOtp = async (params: { email: string }) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: params.email },
  });

  if (!user) {
    throw new StringError('Your email has not been registered');
  }

  const otp = await generateOTP(params.email);
  console.log(otp);
  try {
    // await transporter.sendMail({
    //   from: process.env.DEFAULT_MAIL,
    //   to: [user.email],
    //   subject: 'OTP for Password Reset',
    //   text: `Your OTP for password reset: ${otp}`,
    // });
    return otp;
  } catch (error) {
    throw new Error('Failed to send OTP. Please try again later.');
  }
};

export const verifyEmailOtp = async (params: verifyEmailOtpDTO) => {
  return await verifyOTP(params.email, params.otp);
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
    const data = await dataSource
      .getRepository(User)
      .findOne({ where: { id: params.id }, relations: ['role'] });
    return ApiUtility.sanitizeUser(data);
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { id: params.id },
  };

  const user = await dataSource.getRepository(User).findOne(query);
  if (!user) {
    throw new StringError('User is not existed');
  }

  return ApiUtility.sanitizeUser(user);
};

const update = async (params: UpdateUserByAdminDTO) => {
  const userRepository = dataSource.getRepository(User);
  const role = await dataSource.getRepository(Role).findOne({
    where: { id: params.role },
  });

  const user = await userRepository.findOne({
    where: { id: params.id },
    relations: ['details'],
  });

  if (!role) {
    throw new Error(`Role with ID ${params.role} not found`);
  }

  if (!user) {
    throw new StringError('User does not exist');
  }

  if (params.firstName !== undefined) user.firstName = params.firstName;
  if (params.role !== undefined) user.role = role;
  if (params.lastName !== undefined) user.lastName = params.lastName;
  if (params.phone !== undefined) user.details.phone = params.phone;
  if (params.address !== undefined)
    user.details.address = params.address;
  if (params.gender !== undefined) user.details.gender = params.gender;

  return await userRepository.save(user);
};

const updateMe = async (params: UpdateUserDTO) => {
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: params.id },
    relations: ['details'],
  });

  if (!user) {
    throw new StringError('User does not exist');
  }

  if (params.firstName !== undefined) user.firstName = params.firstName;
  if (params.lastName !== undefined) user.lastName = params.lastName;
  if (params.phone !== undefined) user.details.phone = params.phone;
  if (params.address !== undefined)
    user.details.address = params.address;
  if (params.gender !== undefined) user.details.gender = params.gender;

  return await userRepository.save(user);
};

const list = async (params: IBaseQueryParams) => {
  const userRepository = dataSource.getRepository(User);
  return await listEntities(userRepository, params, 'user', {
    relations: ['details', 'role'],
    searchFields: ['firstName', 'lastName', 'email', 'details.phone'],
    validSortBy: ['email', 'firstName', 'id'],
    validSortOrder: ['ASC', 'DESC'],
    toResponseDTO: toUserResponseDTO,
  });
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
  sendEmailOtp,
  verifyEmailOtp,
  resetPassword,
};
