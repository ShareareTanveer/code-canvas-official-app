import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import permissionService from '../../services/auth/permission.service';
import { CreatePermissionDTO, UpdatePermissionDTO } from '../../services/dto/permission/create-update-permission.dto';

const create: IController = async (req, res) => {
  try {
    const params: CreatePermissionDTO = {
      name: req.body.name,
      codename: req.body.codename,
      entity_name: req.body.entity_name,
    };
    const permission = await permissionService.create(params);
    return ApiResponse.result(res, permission, httpStatusCodes.CREATED);
  } catch (e) {
    console.error('Error creating role:', e);
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: UpdatePermissionDTO = {
      name: req.body.name,
      codename: req.body.codename,
      entity_name: req.body.entity_name,
    };
    const role = await permissionService.update(id, params);
    return ApiResponse.result(res, role, httpStatusCodes.OK);
  } catch (e) {
    console.error('Error updating role:', e);
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await permissionService.list();
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
