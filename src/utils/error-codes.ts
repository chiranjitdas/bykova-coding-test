import { Constants } from './constants';

export enum ErrorCodes {
  ValidationError = 'K101',
  InternalServerError = 'K500'
}

export const ErrorCodeStatusCodeMap = new Map<ErrorCodes, number>([
  [ErrorCodes.ValidationError, Constants.BAD_REQUEST],
  [ErrorCodes.InternalServerError, Constants.INTERNAL_SERVER_ERROR]
]);
