import { ValidationError } from 'express-validator';
import { Constants } from '../utils/constants';
import { ErrorCodes, ErrorCodeStatusCodeMap } from '../utils/error-codes';

export class CustomError extends Error {
  readonly errorCode: ErrorCodes;
  readonly validationErrors?: ValidationError[];
  readonly statusCode: number;

  constructor(errorCode: ErrorCodes, validationErrors?: ValidationError[]) {
    super();
    this.errorCode = errorCode;
    this.validationErrors = validationErrors;
    this.statusCode = ErrorCodeStatusCodeMap.get(errorCode) || Constants.INTERNAL_SERVER_ERROR;
  }
}
