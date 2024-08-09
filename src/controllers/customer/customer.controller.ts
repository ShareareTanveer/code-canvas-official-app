import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/customer/customer.service';
import ApiUtility from '../../utilities/api.utility';
import { IBaseQueryParams } from 'common.interface';
import { ICreateCustomer, IUpdateCustomer } from 'customer/customer.interface';

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
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
      
      if (!files?.tradeLicenseAttachment?.[0]?.path) {
        throw new Error("Trade License Attachment is required.");
      }
      if (!files?.tinAttachment?.[0]?.path) {
        throw new Error("TIN Attachment is required.");
      }
      if (!files?.logo?.[0]?.path) {
        throw new Error("Logo is required.");
      }
      if (!files?.passportAttachment?.[0]?.path) {
        throw new Error("Passport Attachment is required.");
      }

    const params: ICreateCustomer = {
      user: req.user.id,
      nidNumber: req.body.nidNumber,
      company: {
        name: req.body.company.name,
        email: req.body.company.email,
        city: req.body.company.city,
        phone: req.body.company.phone,
        address: req.body.company.address,
        tradeLicenseNo: req.body.company.tradeLicenseNo,
        tinNo: req.body.company.tinNo,
        postCode: req.body.company.postCode,
        tradeLicenseAttachment:
          files?.tradeLicenseAttachment?.[0]?.path,
        tinAttachment: files?.tinAttachment?.[0]?.path,
        logo: files?.logo?.[0]?.path,
      },
      contactPerson: {
        fullName: req.body.contactPerson.fullName,
        email: req.body.contactPerson.email,
        gender: req.body.contactPerson.gender,
        phone: req.body.contactPerson.phone,
        designation: req.body.contactPerson.designation,
      },
      passportAttachment: files?.passportAttachment?.[0]?.path,
      otherAttachment: files?.otherAttachment?.[0]?.path,
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
    const params: IUpdateCustomer = {
      user: req.body.user,
      company: req.body.company,
      contactPerson: req.body.contactPersons,
      nidNumber: req.body.nidNumber,
      passportAttachment: req.body.passportAttachment,
      otherAttachment: req.body.otherAttachment,
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
