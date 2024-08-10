import express from 'express';
import * as HttpStatus from 'http-status-codes';
import { IError } from './api-error-handler.middleware';

interface IJoiErrorDetail {
  message?: string;
  path?: string;
}

interface IJoiError extends IError {
  isJoi?: boolean;
  // tslint:disable-next-line: prefer-array-literal
  details?: Array<IJoiErrorDetail>;
}

export default (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err.data && err.output) {
    const errorResponse = {
      code: HttpStatus.BAD_REQUEST,
      message:
        err.data && err?.data[0]
          ? err?.data[0]?.message
          : 'Invalid Input',
      details:
        err.data &&
        err.data.map((err: any) => ({
          message: err.message,
          context: err.context,
        })),
    };
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, error: errorResponse });
  }
  return next(err);
};
