import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import ourServiceService from '../../services/ourService/our-service.service';
import {
  CreateOurServiceDTO,
  UpdateOurServiceDTO,
} from '../../services/dto/ourService/our-service.dto';

const getById: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const data = await ourServiceService.getById(id);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, e.message);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await ourServiceService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const create: IController = async (req, res) => {
  try {
    const params: CreateOurServiceDTO = req.body;
    const data = await ourServiceService.create(params);
    return ApiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: UpdateOurServiceDTO = req.body;
    const data = await ourServiceService.update(id, params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const remove: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ourServiceService.remove(id);
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
