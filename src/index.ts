import config from './config';
import { codingtestServer } from './server';
import { HealthServer } from './health-server';
import { iocContainer } from './config/ioc';
import { ServiceStatus } from './utils/constants';
import { waitForDependentServices } from './utils/util';
import { Logger } from './config/logger';
import { HealthService } from './services/health-service';

async function main() {
  const logger = iocContainer.get(Logger);
  try {
    const healthService = iocContainer.get(HealthService);
    const healthServer = new HealthServer(healthService, logger);
    await healthServer.start(config.healthPort);
    await new codingtestServer(logger).start(config.port);
    healthService.setStatus(ServiceStatus.Started);
    await waitForDependentServices(logger);
    healthService.setStatus(ServiceStatus.Ready);
  } catch (error) {
    logger.error(error as string);
  }
}

main();
