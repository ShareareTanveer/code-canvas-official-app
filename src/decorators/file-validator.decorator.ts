import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

interface FileValidationOptions {
  allowedExtensions: string[];
  maxSizeInBytes: number;
}

@ValidatorConstraint({ async: false })
class FileValidatorConstraint implements ValidatorConstraintInterface {
  validate(fileOrFiles: any, args: ValidationArguments) {
    const options: FileValidationOptions = args.constraints[0];
    let files: Express.Multer.File[] = [];

    if (Array.isArray(fileOrFiles)) {
      files = fileOrFiles;
    } else {
      files = [fileOrFiles];
    }

    for (const file of files) {
      const fileExtension = file.originalname.split('.').pop();
      if (!options.allowedExtensions.includes(fileExtension)) {
        return false;
      }

      if (file.size > options.maxSizeInBytes) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const options: FileValidationOptions = args.constraints[0];
    return `Each file must have one of the following extensions: ${options.allowedExtensions.join(
      ', ',
    )} and must not exceed ${options.maxSizeInBytes / 1024 / 1024}MB`;
  }
}

export function IsFile(options: FileValidationOptions, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: FileValidatorConstraint,
    });
  };
}
