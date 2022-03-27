import promBundle, { Middleware } from 'express-prom-bundle';
import register from '../../configuration/registerMetrics';

const metricsMiddleware: Middleware = promBundle({
  includeMethod: true,
  includePath: true,
  promRegistry: register
});

export default metricsMiddleware;
