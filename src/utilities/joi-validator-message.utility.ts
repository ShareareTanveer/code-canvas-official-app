export const handleValidationErrors = (errors: any) => {
  return errors.map((error: any) => {
    // console.log(error);
    let message;
    switch (error.type) {
      case 'string.base':
        message = `${error?.context?.label} should be a type of string.`;
        break;
      case 'string.empty':
        message = `${error?.context?.label} cannot be empty.`;
      case 'any.empty':
        message = `${error?.context?.label} cannot be empty.`;
        break;      
      // case 'object.allowUnknown':
      //   message = `${error?.context?.label} is not allowed.`;
      //   break;      
      case 'array.base':
        message = `${error?.context?.label} must be an array.`;
        break;
      case 'string.email':
        message = `${error?.context?.label} must be valid.`;
        break;
      case 'string.guid':
        message = `${error?.context?.label} must be valid UUID.`;
        break;
      case 'string.regex.base':
        message = `${error?.context?.label} must be strong.`;
        break;
      case 'string.min':
        message = `${error?.context?.label} should have a minimum length of ${error?.context?.limit}.`;
        break;
      case 'string.max':
        message = `${error?.context?.label} should have a maximum length of ${error?.context?.limit}.`;
        break;
      case 'any.required':
        message = `${error?.context?.label} is a required field.`;
        break;
      // default:
      //   message = 'Invalid input.';
      //   break;
    }
    return {
      ...error,
      message,
    };
  });
};
