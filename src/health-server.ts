import express from 'express';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';
import { ServiceStatus } from './utils/constants';
import http, { Server } from 'http';
import { HealthService } from './services/health-service';
import { Logger } from './config/logger';

export class HealthServer {
  constructor(private readonly healthService: HealthService, private readonly logger: Logger) {}

  async start(port: number): Promise<Server> {
    const app = express();

    const options: TerminusOptions = {
      logger: this.logger.error,
      healthChecks: {
        '/health/startup': () => this.onStartupCheck(),
        '/health/readiness': () => this.checkStatus(ServiceStatus.Ready),
        '/health/liveliness': () => this.checkStatusIsNot(ServiceStatus.NotAvailable)
      },
      onSignal: this.onSignal
    };
    const server = http.createServer(app);
    return new Promise((resolve, reject) => {
      createTerminus(server, options)
        .listen(port, () => resolve(server))
        .on('error', reject);
    });
  }

  private async onStartupCheck() {
    const currentStatus = this.healthService.getStatus();
    if (currentStatus === ServiceStatus.Started || currentStatus === ServiceStatus.Ready) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('codingtest Service not started'));
    }
  }

  private async checkStatus(status: ServiceStatus) {
    if (this.healthService.getStatus() === status) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`codingtest Service not ${status}`));
    }
  }

  private async checkStatusIsNot(status: ServiceStatus) {
    if (this.healthService.getStatus() !== status) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`codingtest Service ${status}`));
    }
  }

  private async onSignal() {
    return Promise.resolve();
  }
}
