import { NextFunction, Request, Response } from 'express';
import AppLogger from '../../configuration/logger';

const logger = new AppLogger();

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} request on ${req.url}`, {
    remoteIp: req.ip,
    userAgent: req.get('User-Agent')
  });

  next();
};

export default loggerMiddleware;
