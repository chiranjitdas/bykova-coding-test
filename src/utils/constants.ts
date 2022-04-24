export class Constants {
  static readonly MAX_NODES_IN_REQUEST = 2000;
  static readonly DB_NAME = 'codingtest';
  static readonly API_PREFIX = '/api/v1';
  static readonly STATUS = 'status';
  static readonly SERVICE_STATUS = 'serviceStatus';

  // http status codes
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly BAD_REQUEST = 400;

  // validation error messages
  static readonly ARRAY_EMPTY = 'cannot be empty';
  static readonly MAX_LENGTH_ALLOWED = (max: number): string => `length cannot be more than ${max}`;
  static readonly IS_NUMERIC = 'should be numeric';
}

export enum ServiceStatus {
  Started = 'Started',
  Ready = 'Ready',
  NotAvailable = 'Not Available'
}
