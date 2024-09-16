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
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files?.images?.[0]?.path) {
      throw new Error('Images are required.');
    }

    if (!files?.featuredImage?.[0]?.path) {
      throw new Error('featuredImage is required.');
    }

    const params: ICreateProduct = {
      productCategory: req.body.productCategory,
      title: req.body.title,
      subtitle: req.body.subtitle,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      is_documented: req.body.is_documented,
      tags: req.body.tags,
      images: files?.images,
      featuredImage: files?.featuredImage?.[0]?.path,
      priceOptions: req.body.priceOptions,
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
    const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

    const params: IUpdateProduct = {
      productCategory: req.body.productCategory,
      title: req.body.title,
      subtitle: req.body.subtitle,
      slug: req.body.slug,
      description: req.body.description,
      live_link: req.body.live_link,
      is_documented: req.body.is_documented,
      addImages: files?.addImages,
      featuredImage: files?.featuredImage?.[0]?.path,
      deleteImages: req.body.deleteImages,
      tags: req.body.tags,
      deletePriceOptions: req.body.deletePriceOptions,
      addPriceOptions: req.body.addPriceOptions,
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
