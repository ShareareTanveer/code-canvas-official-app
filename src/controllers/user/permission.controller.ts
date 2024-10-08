import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/auth/permission.service';
import { ICreatePermission, IUpdatePermission } from 'auth/permission.interface';

const create: IController = async (req, res) => {
  try {
    const params: ICreatePermission = {
      name: req.body.name,
      codename: req.body.codename,
      entity_name: req.body.entity_name,
    };
    const permission = await service.create(params);
    return ApiResponse.result(res, permission, httpStatusCodes.CREATED);
  } catch (e) {
    console.error('Error creating role:', e);
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: IUpdatePermission = {
      name: req.body.name,
      codename: req.body.codename,
      entity_name: req.body.entity_name,
    };
    const role = await service.update(id, params);
    return ApiResponse.result(res, role, httpStatusCodes.OK);
  } catch (e) {
    console.error('Error updating role:', e);
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
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

export default {
  create,
  list,
  update,
};
