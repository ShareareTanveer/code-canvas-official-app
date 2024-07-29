import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/cart/cart.service';
import { User } from '../../entities/user/user.entity';
import { AddToCartDTO } from '../../services/dto/cart/cart.dto';
import ApiUtility from '../../utilities/api.utility';
import { IBaseQueryParams } from 'common.interface';

const getById: IController = async (req, res) => {
  try {
    const id: string = req.params.id;
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
    const params: AddToCartDTO = {
      product: req.body.product,
    };
    const user: User = req.user;
    const { data, added } = await service.toggleCartProduct(
      params,
      user,
    );
    const status = added
      ? httpStatusCodes.CREATED
      : httpStatusCodes.ACCEPTED;
    const message = added
      ? 'Product added to cart'
      : 'Product removed from cart';
    console.log(message, status);
    return ApiResponse.result(res, data, status);
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
    const id: string = req.params.id;
    const user: User = req.user;
    await service.remove(id, user);
    return ApiResponse.result(
      res,
      { message: 'Cart deleted successfully' },
      httpStatusCodes.NO_CONTENT,
    );
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
  remove,
};
