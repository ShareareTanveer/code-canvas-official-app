import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import orderService from '../../services/order/order.service';
import { CreateOrderDTO, UpdateOrderDTO } from '../../services/dto/order/order.dto';

const getById: IController = async (req, res) => {
  try {
    const id: string = req.params.id;
    const data = await orderService.getById(id);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(
      res,
      httpStatusCodes.NOT_FOUND,
      e.message,
    );
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await orderService.list();
    return ApiResponse.result(res, data, httpStatusCodes.OK, null);
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
    const params: CreateOrderDTO = {
      cartId: req.body.cartId,
    };
    const data = await orderService.create(params);
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
    const id: string = req.params.id;
    const params: UpdateOrderDTO = {
        cartId: req.body.cartId,
    };
    const data = await orderService.update(id, params);
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
    const id: string = req.params.id;
    const data = await orderService.remove(id);
    return ApiResponse.result(res, {},httpStatusCodes.OK);
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
  remove
};
