export const handleValidationErrors = (errors:any) => {
  return errors.map((error:any) => {
    let message;
    switch (error.type) {
      case 'string.base':
        message = `${error?.context?.label} should be a type of string.`;
        break;
      case 'string.empty':
        message = `${error?.context?.label} cannot be empty.`;      
      case 'string.email':
        message = `${error?.context?.label} cannot be empty.`;
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
      default:
        message = 'Invalid input.';
        break;
    }
    return {
      ...error,
      message,
    };
  });
};
