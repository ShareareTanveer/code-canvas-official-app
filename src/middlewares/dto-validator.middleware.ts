import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiResponse from '../utilities/api-response.utility';

export function validateDTO(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {

    if (typeof req.body.keyPoints === 'string') {
      req.body.keyPoints = req.body.keyPoints
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item);
    }

    if (typeof req.body.faqs === 'string') {
      req.body.faqs = JSON.parse(req.body.faqs);
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