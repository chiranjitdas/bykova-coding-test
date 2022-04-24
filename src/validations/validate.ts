import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from '../models/custom-error';
import { ErrorCodes } from '../utils/error-codes';

export const validate = (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(ErrorCodes.ValidationError, errors.array());
  }
  next();
};
