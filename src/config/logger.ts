import { injectable } from 'inversify';
import Debug, { Debugger } from 'debug';

/* eslint-disable no-console */
@injectable()
export class Logger {
  private readonly debugger: Debugger;

  constructor() {
    this.debugger = Debug('codingtest');
  }

  info(message: string, ...data: unknown[]): void {
    console.log(message, ...data);
  }

  error(message: string, ...data: unknown[]): void {
    console.error(message, ...data);
  }

  debug(message: string, ...data: unknown[]): void {
    this.debugger(message, ...data);
  }
}
