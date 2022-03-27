import express, { Application } from 'express';
import * as swaggerUI from 'swagger-ui-express';

import BaseController from './controllers/base.controller';
import loadYamlFile from '../configuration/loadYamlFile';
import AppLogger from '../configuration/logger';

const logger = new AppLogger();

export default class App {
  public readonly application: Application;

  public readonly port: number;

  constructor(props: {
    port: number;
    middleWares: any;
    controllers: Array<BaseController>;
    spec?: string;
  }) {
    this.application = express();
    this.port = props.port;

    this.loadSpec(props.spec);
    this.middlewares(props.middleWares);
    this.routes(props.controllers);
  }

  private middlewares(middleWares: any) {
    middleWares.forEach((middleWare: any) => this.application.use(middleWare));
  }

  private routes(controllers: Array<BaseController>) {
    controllers.forEach((controller) =>
      this.application.use('/', controller.getRoutes())
    );
  }

  private loadSpec(spec?: string) {
    if (spec !== undefined) {
      const fileLoaded = loadYamlFile(spec);

      if (fileLoaded !== undefined) {
        this.application.use(
          '/docs',
          swaggerUI.serve,
          swaggerUI.setup(fileLoaded)
        );
      }
    }
  }

  public listen() {
    return this.application.listen(this.port, () => {
      logger.info(`App listening on the http://localhost:${this.port}`);
    });
  }
}
