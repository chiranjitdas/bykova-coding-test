import { body, ValidationChain } from 'express-validator';
import { SearchCityRequestData } from '../models/city/search-city';
import { Constants } from '../utils/constants';
import { nameof } from '../utils/util';

export const validateSearchCityRequest = (): ValidationChain[] => [
  body(nameof<SearchCityRequestData>('searchString')).isString().withMessage(Constants.ARRAY_EMPTY)
];
