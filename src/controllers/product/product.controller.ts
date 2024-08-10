import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/product/product.service';
import ApiUtility from '../../utilities/api.utility';
import { IBaseQueryParams } from 'common.interface';
import {
  ICreateProduct,
  IUpdateProduct,
} from 'product/product.interface';

const getById: IController = async (req, res) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const data = await service.getById(id);
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
    const imageLocalFiles = (req.files as Express.Multer.File[]).map(
      (file) => file,
    );
    
    if (imageLocalFiles.length < 1) {
      throw new Error('No files were uploaded.');
    }
    const params: ICreateProduct = {
      category: req.body.category,
      title: req.body.title,
      subtitle: req.body.subtitle,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      support_for: req.body.support_for,
      price: req.body.price,
      is_documented: req.body.is_documented,
      tags: req.body.tags,
      images: imageLocalFiles,
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
    const imageLocalFiles = (req.files as Express.Multer.File[]).map(
      (file) => file,
    );
    const params: IUpdateProduct = {
      category: req.body.category,
      title: req.body.title,
      subtitle: req.body.subtitle,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      support_for: req.body.support_for,
      price: req.body.price,
      is_documented: req.body.is_documented,
      addImages: imageLocalFiles,
      deleteImages: req.body.deleteImages,
      tags: req.body.tags,
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
