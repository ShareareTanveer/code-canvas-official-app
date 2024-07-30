import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiResponse from '../utilities/api-response.utility';

export function validateDTO(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // if (req.files && Array.isArray(req.files)) {
    //   req.body.files = req.files;
    // } else if (req.file) {
    //   req.body.file = req.file;
    // }

    // console.log(req.body.files || req.body.file, "req.body.files or req.body.file");

    if (typeof req.body.keyPoints === 'string') {
      req.body.keyPoints = JSON.parse(req.body.keyPoints);
    }

    const dtoObject = plainToInstance(dtoClass, req.body);
    validate(dtoObject).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const firstError = errors[0];
        const firstErrorMessage = Object.values(
          firstError.constraints || {},
        )[0];
        return ApiResponse.error(res, 400, firstErrorMessage);
      } else {
        req.body = dtoObject;
        next();
      }
    });
  };
}