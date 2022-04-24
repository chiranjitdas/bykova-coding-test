import { Logger } from '../config/logger';

export const nameof = <T>(name: Extract<keyof T, string>): string => name;
export async function waitForDependentServices(logger: Logger): Promise<void> {
  logger.info('Connecting to database...');
}
