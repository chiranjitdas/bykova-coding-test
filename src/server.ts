import express, { Application } from 'express';
import helmet from 'helmet';
import { iocContainer } from './config/ioc';
import config from './config';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error-handler';
import { Server } from 'http';
import { Logger } from './config/logger';
import { readFileSync } from 'fs';
import { Constants } from './utils/constants';
import swaggerUi from 'swagger-ui-express';
import { CodingtestController } from './controllers/codingtest-controller';

export class codingtestServer {
  constructor(private readonly logger: Logger) {}

  public async start(port: number): Promise<Server> {
    const app = express();
    this.setupMiddleware(app);
    iocContainer.get(CodingtestController).registerRoutes(app);
    // custom error handler
    app.use(errorHandler);

    return new Promise((resolve, reject) => {
      const httpServer: Server = app.listen(port, () => resolve(httpServer)).on('error', reject);
    });
  }

  private setupMiddleware(app: Application) {
    app.use(morgan('[:date[iso]] :method :url :status :res[content-length] - :response-time ms'));
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            'default-src': ['"none"'],
            'frame-ancestors': ['"none"']
          }
        }
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    this.setupSwaggerDocs(app);
  }

  private setupSwaggerDocs(app: Application) {
    if (config.production) {
      return;
    }
    try {
      const swaggerDocument = JSON.parse(readFileSync('dist/swagger.json').toString());
      if (config.swaggerBaseUrl) {
        swaggerDocument.servers = [{ url: `${config.swaggerBaseUrl}${Constants.API_PREFIX}` }];
      } else {
        swaggerDocument.servers = [{ url: Constants.API_PREFIX }];
      }
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (error) {
      this.logger.error(error as string);
    }
  }
}
