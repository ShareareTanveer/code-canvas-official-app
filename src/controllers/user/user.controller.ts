import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { StringError } from '../../errors/string.error';
import ApiResponse from '../../utilities/api-response.utility';
import ApiUtility from '../../utilities/api.utility';
import Encryption from '../../utilities/encryption.utility';
import IController from '../../interfaces/IController';
import service from '../../services/user/user.service';
import {
  IBaseQueryParams,
  IDeleteById,
  IDetailById,
} from '../../interfaces/common.interface';
import {
  loginDTO,
  resetPasswordDTO,
  sendEmailDTO,
} from '../../services/dto/auth/auth.dto';
import {
  CreateUserDTO,
  RegisterUserDTO,
  UpdateUserByAdminDTO,
  UpdateUserDTO,
} from '../../services/dto/user/user.dto';
import constants from '../../constants';
import { MailData } from 'mail-data.interface';
import { forgotPassword, twoFactorAuth, userSignUp } from '../../services/mail/mail.service';

const register: IController = async (req, res) => {
  try {
    const imageLocalFile = req.file?.path;
    const params: RegisterUserDTO = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      image: imageLocalFile,
    };

    const user = await service.register(params);
    const cookie: any = await generateRegisterCookie(user.email);
    const access_token = cookie.value;
    const mailDataSignUp: MailData<{ hash: string }> = {
      data: {
        hash: access_token,
      },
      to: 'ominuzhat@gmail.com',
    };
    console.log(access_token);
    userSignUp(mailDataSignUp);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    const statusCode =
      e.code === constants.ERROR_CODE.DUPLICATED
        ? httpStatusCodes.CONFLICT
        : httpStatusCodes.BAD_REQUEST;
    const message =
      e.code === constants.ERROR_CODE.DUPLICATED
        ? 'Email already exists.'
        : e?.message;

    return ApiResponse.error(res, statusCode, message);
  }
};

const verifyEmail: IController = async (req, res) => {
  try {
    const authorizationHeader = ApiUtility.getCookieFromRequest(
      req,
      constants.COOKIE.COOKIE_REGISTER_USER,
    );

    if (!authorizationHeader) {
      return ApiResponse.error(
        res,
        httpStatusCodes.UNAUTHORIZED,
        'Invalid or expired token',
      );
    }
    const decoded: any = jwt.verify(
      authorizationHeader,
      constants.APPLICATION.env.AUTH_REGISTER_SECRET,
    );
    if (!decoded || !decoded.data.registered_user) {
      return ApiResponse.error(
        res,
        httpStatusCodes.UNAUTHORIZED,
        'Invalid or expired token',
      );
    }
    const params = {
      email: decoded.data.registered_user,
    };
    const user = await service.verifyEmail(params);
    if (!user.id || !user.status) {
      throw new Error('Could not verified user');
    }
    ApiResponse.deleteCookie(
      res,
      constants.COOKIE.COOKIE_REGISTER_USER,
    );
    const cookie: any = await generateUserCookie(user.id);
    const access_token = cookie.value;
    const data = {
      access_token,
      user,
    };
    return ApiResponse.result(res, data, httpStatusCodes.OK, cookie);
  } catch (e) {
    if (e instanceof StringError) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        e?.message,
      );
    }
    return ApiResponse.error(
      res,
      httpStatusCodes.UNAUTHORIZED,
      e.message,
    );
  }
};

const login: IController = async (req, res) => {
  try {
    let web = 1;
    if (req.query.web && parseInt(req.query.web as string, 10) === 0) {
      web = 0;
    }
    const params: loginDTO = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await service.login(params);
    const cookie: any = await generateRegisterCookie(user.email);
    const access_token = cookie.value;
    const mailData: MailData<{ hash: string }> = {
      data: {
        hash: access_token,
      },
      to: 'ominuzhat@gmail.com',
    };
    console.log(access_token);
    twoFactorAuth(mailData, web);
    return ApiResponse.result(res, user, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

const create: IController = async (req, res) => {
  try {
    const imageLocalFile = req.file?.path;
    const params: CreateUserDTO = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      role: req.body.role,
      image: imageLocalFile,
    };
    const user = await service.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(
        res,
        httpStatusCodes.CONFLICT,
        'Email already exists.',
      );
    }
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e?.message,
    );
  }
};

export const sendResetPasswordEmail: IController = async (req, res) => {
  try {
    const params: sendEmailDTO = {
      email: req.body.email,
    };
    const user = await service.sendResetPasswordEmail(params);
    const cookie: any = await generateResetPasswordCookie(user.email);
    const access_token = cookie.value;
    const mailDataSignUp: MailData<{ hash: string }> = {
      data: {
        hash: access_token,
      },
      to: 'ominuzhat@gmail.com',
    };
    console.log(access_token)
    forgotPassword(mailDataSignUp);
    return ApiResponse.result(
      res,
      { message: 'Quick Link is sent to your email' },
      httpStatusCodes.OK,
    );
  } catch (e) {
    console.error(e);
    return ApiResponse.error(res, 500, e.message);
  }
};

export const resetPassword: IController = async (req, res) => {
  try {
    const { confirmNewPassword, newPassword }: resetPasswordDTO =
      req.body;
    if (confirmNewPassword !== newPassword) {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'Password does not match',
      );
    }
    const authorizationHeader = ApiUtility.getCookieFromRequest(
      req,
      constants.COOKIE.COOKIE_RESET_PASSWORD,
    );

    if (!authorizationHeader) {
      return ApiResponse.error(
        res,
        httpStatusCodes.UNAUTHORIZED,
        'Invalid or expired token',
      );
    }
    const decoded: any = jwt.verify(
      authorizationHeader,
      constants.APPLICATION.env.AUTH_RESET_PASSWORD_SECRET,
    );

    if (!decoded || !decoded.data.pending_user) {
      return ApiResponse.error(
        res,
        httpStatusCodes.UNAUTHORIZED,
        'Invalid or expired token',
      );
    }
    const email = decoded.data.pending_user;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await service.resetPassword(email, hashedPassword);

    if (result) {
      ApiResponse.deleteCookie(
        res,
        constants.COOKIE.COOKIE_RESET_PASSWORD,
      );
      ApiResponse.deleteCookie(res, constants.COOKIE.COOKIE_USER);
      return ApiResponse.result(
        res,
        { message: 'Password reset successfully' },
        httpStatusCodes.OK,
      );
    } else {
      return ApiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        'Failed to reset password',
      );
    }
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      e.message,
    );
  }
};

const logout: IController = async (req, res) => {
  try {
    ApiResponse.deleteCookie(res, constants.COOKIE.COOKIE_USER);
    return ApiResponse.result(
      res,
      { message: 'Logged out' },
      httpStatusCodes.OK,
    );
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const me: IController = async (req, res) => {
  const cookie = await generateUserCookie(req.user.id);
  return ApiResponse.result(res, req.user, httpStatusCodes.OK, cookie);
};

const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    };
    const data = await service.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const imageLocalFile = req.file?.path;
    const params: UpdateUserByAdminDTO = {
      id: parseInt(req.params.id, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      role: req.body.role,
      image: imageLocalFile,
    };
    const user = await service.update(params);
    return ApiResponse.result(res, user, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateMe: IController = async (req, res) => {
  try {
    const imageLocalFile = req.file?.path;
    const params: UpdateUserDTO = {
      id: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      image: imageLocalFile,
    };
    const user = await service.updateMe(params);
    return ApiResponse.result(res, user, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const pagination = ApiUtility.getQueryParam(req, 'pagination');
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const sortOrder = ApiUtility.getQueryParam(req, 'sortOrder');
    const sortBy = ApiUtility.getQueryParam(req, 'sortBy');
    const params: IBaseQueryParams = {
      pagination,
      limit,
      page,
      keyword,
      sortOrder,
      sortBy,
    };
    const data = await service.list(params);
    return ApiResponse.result(
      res,
      data.response,
      httpStatusCodes.OK,
      null,
      data.pagination,
    );
  } catch (e) {
    console.error(e);
    ApiResponse.exception(res, e.message);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id, 10),
    };
    await service.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.COOKIE.COOKIE_USER,
    value: await Encryption.generateCookie(
      constants.COOKIE.KEY_USER_ID,
      userId.toString(),
    ),
  };
};

const generateResetPasswordCookie = async (email: string) => {
  return {
    key: constants.COOKIE.COOKIE_RESET_PASSWORD,
    value: await Encryption.generateResetPasswordCookie(
      constants.COOKIE.COOKIE_RESET_PASSWORD,
      email,
    ),
  };
};

const generateRegisterCookie = async (email: string) => {
  return {
    key: constants.COOKIE.COOKIE_REGISTER_USER,
    value: await Encryption.generateRegisterCookie(
      constants.COOKIE.COOKIE_REGISTER_USER,
      email,
    ),
  };
};

export default {
  register,
  create,
  login,
  me,
  detail,
  update,
  updateMe,
  list,
  remove,
  logout,
  verifyEmail,
  resetPassword,
  generateResetPasswordCookie,
  sendResetPasswordEmail
};
