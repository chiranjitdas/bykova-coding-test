import { Application, Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { SearchCityRequestData } from '../models/city/search-city';
import { validateSearchCityRequest } from '../validations/search-city-request';
import { ContextNext, ContextResponse } from 'typescript-rest';
import { CodingtestService } from '../services';
import { Constants } from '../utils/constants';
import { validate } from '../validations/validate';
import { BaseController } from './base-controller';

@injectable()
export class CodingtestController implements BaseController {
  constructor(@inject(CodingtestService) private readonly codingtestService: CodingtestService) {}

  registerRoutes(app: Application): void {
    app
      .route(`${Constants.API_PREFIX}/suggestions`)
      .post(validateSearchCityRequest(), validate, (req: Request, res: Response, next: NextFunction) => {
        this.getSuggestions(req.body, res, next);
      });
  }
  async getSuggestions(
    searchCityRequestData: SearchCityRequestData,
    @ContextResponse res: Response,
    @ContextNext next: NextFunction
  ): Promise<void> {
    try {
      const airportsList = await this.codingtestService.searchCities(searchCityRequestData);
      res.status(200).json({ airportsList });
    } catch (error) {
      next(error);
    }
  }
}
