import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';

import transactionContext, {
  TransactionKey
} from '../../configuration/transactionContext';

const transactionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transactionId = req.get(TransactionKey.TRANSACTION_ID) ?? v4();
  res.setHeader(TransactionKey.TRANSACTION_ID, transactionId);
  transactionContext.addId(next, transactionId);
  next();
};

export default transactionMiddleware;
