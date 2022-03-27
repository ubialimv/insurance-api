import AutoEngine from '../domain/engine/specialized/auto.engine';
import BasicEngine from '../domain/engine/basic.engine';
import CommonRulesEngine from '../domain/engine/common-rules.engine';
import DisabilityEngine from '../domain/engine/specialized/disability.engine';
import HomeEngine from '../domain/engine/specialized/home.engine';
import LifeEngine from '../domain/engine/specialized/life.engine';
import PlanService from '../domain/plan/plan.service';
import PlanController from '../application/controllers/plan.controller';
import { json, urlencoded } from 'express';
import transactionMiddleware from '../application/middlewares/transaction.middleware';
import loggerMiddleware from '../application/middlewares/logger.middleware';
import { OpenApiValidatorMiddleware } from '../application/middlewares/openApi.middleware';
import metricsMiddleware from '../application/middlewares/metrics.middleware';

const makeCommonRuleEngine = () => new CommonRulesEngine(new BasicEngine());

const makeAutoEngine = () => new AutoEngine(makeCommonRuleEngine());
const makeDisabilityEngine = () => new DisabilityEngine(makeCommonRuleEngine());
const makeHomeEngine = () => new HomeEngine(makeCommonRuleEngine());
const makeLifeEngine = () => new LifeEngine(makeCommonRuleEngine());

const makePlanService = () =>
  new PlanService(
    makeAutoEngine(),
    makeDisabilityEngine(),
    makeHomeEngine(),
    makeLifeEngine()
  );

const makePlanController = () => new PlanController(makePlanService());

const makeMiddlewares = () => [
  json(),
  urlencoded({ extended: true }),
  metricsMiddleware,
  transactionMiddleware,
  loggerMiddleware,
  OpenApiValidatorMiddleware
];

export {
  makeCommonRuleEngine,
  makeAutoEngine,
  makeDisabilityEngine,
  makeHomeEngine,
  makeLifeEngine,
  makePlanService,
  makePlanController,
  makeMiddlewares
};
