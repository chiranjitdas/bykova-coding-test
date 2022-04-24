import { injectable } from 'inversify';
import { Logger } from '../config/logger';
import { ServiceStatus } from '../utils/constants';

@injectable()
export class HealthService {
  private status: ServiceStatus;

  constructor(private readonly logger: Logger) {
    this.status = ServiceStatus.NotAvailable;
  }

  getStatus(): ServiceStatus {
    return this.status;
  }

  setStatus(status: ServiceStatus): void {
    this.status = status;
    this.logger.info(`Service status: ${status}`);
  }
}
