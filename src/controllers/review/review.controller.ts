import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/review/review.service';
import ApiUtility from '../../utilities/api.utility';
import { User } from '../../entities/user/user.entity';
import { IBaseQueryParams } from 'common.interface';
import { ICreateReview, IUpdateReview } from 'review/review.interface';
import constants from '../../constants';

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
    const params: ICreateReview = {
      rating: req.body.rating,
      text: req.body.text,
      product: req.body.product,
    };
    const user: User = req.user;
    const data = await service.create(params, user);
    return ApiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    const statusCode =
      e.code === constants.ERROR_CODE.DUPLICATED
        ? httpStatusCodes.CONFLICT
        : httpStatusCodes.BAD_REQUEST;
    const message =
      e.code === constants.ERROR_CODE.DUPLICATED
        ? 'Review already exists.'
        : e?.message;

    return ApiResponse.error(res, statusCode, message);
  }
};

const update: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const params: IUpdateReview = {
      rating: req.body.rating,
      text: req.body.text,
    };
    const user: User = req.user;
    const data = await service.update(id, params, user);
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
    const data = await service.remove(id);
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
