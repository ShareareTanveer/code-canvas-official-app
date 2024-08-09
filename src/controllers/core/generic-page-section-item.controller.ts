import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/core/generic-page-section-item.service';
import ApiUtility from '../../utilities/api.utility';
import { IBaseQueryParams } from 'common.interface';
import {
  ICreateGenericPageSectionItem,
  IUpdateGenericPageSectionItem,
} from 'core/generic-page-section-item.interface';

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
    const params: ICreateGenericPageSectionItem = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      keyPoints: req.body.keyPoints,
      icon: req.body.icon,
      genericPageSection: req.body.genericPageSection,
      image: imageLocalFile,
    };
    const data = await service.create(params);
    return ApiResponse.result(res, data, httpStatusCodes.CREATED);
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
    const imageLocalFile = req.file?.path;
    const params: IUpdateGenericPageSectionItem = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      keyPoints: req.body.keyPoints,
      icon: req.body.icon,
      genericPageSection: req.body.genericPageSection,
      image: imageLocalFile,
    };
    const data = await service.update(id, params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

const remove: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await service.remove(id);
    return ApiResponse.result(res, {}, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      e.message,
    );
  }
};

export default {
  getById,
  list,
  create,
  update,
  remove,
};
