import 'reflect-metadata';
import { Container } from 'inversify';
import { CodingtestService } from '../services';
import { Logger } from './logger';
import { CodingtestController } from '../controllers/codingtest-controller';
import { CityRepository } from '../repositories/city/city-repository';

const iocContainer = new Container();

// controllers
iocContainer.bind(CodingtestController).toSelf().inSingletonScope();

// services
iocContainer.bind(CodingtestService).toSelf().inSingletonScope();
iocContainer.bind(Logger).toSelf().inSingletonScope();

// repositories
iocContainer.bind(CityRepository).toSelf().inSingletonScope();

export { iocContainer };
