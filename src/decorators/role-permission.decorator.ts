import {  Response, NextFunction } from 'express';
import IRequest from 'IRequest';
import httpStatusCodes from 'http-status-codes';
import ApiResponse from '../utilities/api-response.utility';

export const IsAdmin = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role.name === 'Admin') {
    next();
  } else {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
}
};

export const IsUser = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role.name === 'User') {
    next();
  } else {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
}
};
