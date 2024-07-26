import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import productService from '../../services/product/product.service';
import {
  UpdateProductDTO,
  CreateProductDTO,
} from '../../services/dto/product/product.dto';
import { IProductQueryParams } from 'product.interface';
import ApiUtility from '../../utilities/api.utility';

const getById: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const data = await productService.getById(id);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
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
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const category = ApiUtility.getQueryParam(req, 'category');
    const sortOrder = ApiUtility.getQueryParam(req, 'sortOrder');
    const sortBy = ApiUtility.getQueryParam(req, 'sortBy');
    const params: IProductQueryParams = {
      limit,
      page,
      keyword,
      category,
      sortOrder,
      sortBy,
    };
    const data = await productService.list(params);
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
    const params: CreateProductDTO = {
      category: req.body.category,
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      support_for: req.body.support_for,
      price: req.body.price,
      is_documented: req.body.is_documented,
      images: req.body.images,
      tags: req.body.tags,
    };
    const data = await productService.create(params);
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
    const params: UpdateProductDTO = {
      category: req.body.category,
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      support_for: req.body.support_for,
      price: req.body.price,
      is_documented: req.body.is_documented,
      images: req.body.images,
      tags: req.body.tags,
    };
    const data = await productService.update(id, params);
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
    await productService.remove(id);
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
