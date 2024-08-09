import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/core/office-info.service';
import { ICreateOfficeInfo, IUpdateOfficeInfo } from 'core/office-info.interface';

const getById: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const data = await service.getById(id);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, e.message);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await service.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const create: IController = async (req, res) => {
  try {
    const params: ICreateOfficeInfo = req.body;
    const data = await service.create(params);
    return ApiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: IUpdateOfficeInfo = req.body;
    const data = await service.update(id, params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const remove: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await service.remove(id);
    return ApiResponse.result(res, {}, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
