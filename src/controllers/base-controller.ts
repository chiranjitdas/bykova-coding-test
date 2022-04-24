import { Application } from 'express';

export interface BaseController {
  registerRoutes(app: Application): void;
}
