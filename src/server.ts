import App from './application/app';
import { makeMiddlewares, makePlanController } from './shared/factory';
import { OPEN_API_SPEC_FILE_LOCATION } from './application/middlewares/openApi.middleware';
import env from './shared/environments';

const controllers = [makePlanController()];
const app = new App({
  port: env.PORT,
  middleWares: makeMiddlewares(),
  controllers,
  spec: OPEN_API_SPEC_FILE_LOCATION
});

app.listen();
