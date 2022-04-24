import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { CustomError } from '../models/custom-error';
import { CustomValidationError, CityResponse } from '../models/city-response';
import { Constants } from '../utils/constants';
import { ErrorCodes, ErrorCodeStatusCodeMap } from '../utils/error-codes';

// Need 4 params defined in the function for it to be a error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  let statusCode: number;
  let response: CityResponse;
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    response = {
      errorCode: err.errorCode,
      validationErrors:
        err.validationErrors && err.validationErrors.length ? formatValidationErrors(err.validationErrors) : undefined,
      suggestionsList: []
    };
  } else {
    statusCode = ErrorCodeStatusCodeMap.get(ErrorCodes.InternalServerError) || Constants.INTERNAL_SERVER_ERROR;
    response = {
      errorCode: ErrorCodes.InternalServerError,
      suggestionsList: []
    };
  }
  res.status(statusCode).json(response);
};

function formatValidationErrors(validationErrors: ValidationError[]): CustomValidationError[] {
  return validationErrors.map(x => ({ field: x.param, message: x.msg } as CustomValidationError));
}
