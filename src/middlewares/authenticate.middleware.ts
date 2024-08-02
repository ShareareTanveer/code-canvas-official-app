import { URL } from 'url';
import express, { NextFunction } from 'express';
import httpStatusCodes from 'http-status-codes';
import ApiResponse from '../utilities/api-response.utility';
import ApiUtility from '../utilities/api.utility';
import Encryption from '../utilities/encryption.utility';
import { User } from '../entities/user/user.entity';
import { Permission } from '../entities/user/permission.entity';
import userService from '../services/user/user.service';
import IRequest from '../interfaces/IRequest';
import dataSource from '../configs/orm.config';
import constants from '../constants';

const shouldIgnoreAuth = (path: string): boolean => {
  return (
    constants.APPLICATION.authorizationIgnorePath.includes(path) ||
    constants.APPLICATION.authorizationIgnoreRegex.some((regex) =>
      regex.test(path),
    )
  );
};

export default async (
  req: IRequest,
  res: express.Response,
  next: NextFunction,
) => {
  const path = req.path;

  if (shouldIgnoreAuth(path)) {
    return next();
  }

  const authorizationHeader = ApiUtility.getCookieFromRequest(
    req,
    constants.COOKIE.COOKIE_USER,
  );

  if (!authorizationHeader) {
    return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
  }

  const decoded = await Encryption.verifyCookie(authorizationHeader);

  if (!decoded) {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
  }

  const user = await userService.getById({
    id: decoded.data[constants.COOKIE.KEY_USER_ID],
  });

  if (!user) {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
  }

  // @ts-ignore
  req.user = user;
  next();
};

export const checkPermission = (action: string, modelName: string) => {
  return async (req: any, res: any, next: NextFunction) => {
    const userRepository = dataSource.getRepository(User);
    const permissionRepository = dataSource.getRepository(Permission);
    try {
      const user = await userRepository.findOne({
        where: { id: req.user.id },
        relations: ['role', 'role.permissions'],
      });
      if (!user) {
        return res
          .status(403)
          .json({ message: 'Unauthorized: User not found' });
      }
      const permission = await permissionRepository.findOne({
        where: { codename: `${action}_${modelName}` },
      });
      if (!permission) {
        return res
          .status(403)
          .json({ message: 'Unauthorized: Permission not found' });
      }
      if (!user.role) {
        return res
          .status(403)
          .json({ message: 'Unauthorized: Role not found' });
      }
      const hasPermission = user.role.permissions.some(
        (p) => p.codename === `${action}_${modelName}`,
      );
      if (hasPermission || user.role.name === 'Admin') {
        next();
      } else {
        return res
          .status(403)
          .json({ message: 'Unauthorized: Insufficient permissions' });
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
