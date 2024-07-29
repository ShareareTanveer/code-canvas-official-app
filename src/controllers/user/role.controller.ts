import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/auth/role.service';
import { CreateRoleDTO,UpdateRoleDTO } from '../../services/dto/auth/role.dto';

const create: IController = async (req, res) => {
  try {
    const params: CreateRoleDTO = {
      name: req.body.name,
      permissions: req.body.permissions,
      users: req.body.users,
    };
    const role = await service.create(params);
    return ApiResponse.result(res, role, httpStatusCodes.CREATED);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: UpdateRoleDTO = {
      name: req.body.name,
      permissions: req.body.permissions,
      users: req.body.users,
    };
    const role = await service.update(id, params);
    return ApiResponse.result(res, role, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await service.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK, null);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const detail: IController = async (req, res) => {
  try {
    const params: {id: number} = {
      id: parseInt(req.params.id, 10),
    };
    const data = await service.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );  }
};

const remove: IController = async (req, res) => {
  try {
    const params: {id: number} = {
      id: parseInt(req.params.id, 10),
    };
    await service.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );  }
};

export default {
  create,
  list,
  detail,
  update,
  remove,
};
