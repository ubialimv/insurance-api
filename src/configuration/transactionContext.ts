import { AsyncLocalStorage } from 'async_hooks';
import { v4 } from 'uuid';

export enum TransactionKey {
  TRANSACTION_ID = 'transaction-id'
}
class TransactionContext {
  private readonly context: AsyncLocalStorage<Map<string, unknown>>;

  constructor() {
    this.context = new AsyncLocalStorage<Map<string, unknown>>();
  }

  addId(cb: () => unknown, id?: unknown) {
    const transactionId = id ?? v4();

    return this.context.run(new Map(), () => {
      this.context
        .getStore()
        ?.set(TransactionKey.TRANSACTION_ID, transactionId);

      return cb();
    });
  }

  getId() {
    return this.context.getStore()?.get(TransactionKey.TRANSACTION_ID);
  }
}

export default new TransactionContext();
