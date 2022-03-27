import pino, { Logger } from 'pino';
import environments from '../shared/environments';
import transactionContext, { TransactionKey } from './transactionContext';

export default class AppLogger {
  private readonly instance: Logger;

  constructor() {
    this.instance = pino({
      ...this.getOptions(),
      mixin() {
        return {
          [TransactionKey.TRANSACTION_ID]: transactionContext.getId()
        };
      }
    });
  }

  info(msg: string, obj = {}) {
    this.instance.info(obj, msg);
  }

  private getOptions = () => {
    if (environments.NODE_ENV === 'local') {
      return {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: true
          }
        }
      };
    } else {
      return {};
    }
  };
}
