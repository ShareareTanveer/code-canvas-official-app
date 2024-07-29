import httpStatusCodes from 'http-status-codes';
import IController from '../../interfaces/IController';
import ApiResponse from '../../utilities/api-response.utility';
import service from '../../services/core/main-website-page.service';

const getByName: IController = async (req, res) => {
  try {
    const sectionName: string = req.params.sectionName
    const data = await service.getSectionByName(sectionName);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.NOT_FOUND, e.message);
  }
};

const landingPageData: IController = async (req, res) => {
  try {
    const data = await service.landingPageData();
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

export default {
  getByName,
  landingPageData,
};
