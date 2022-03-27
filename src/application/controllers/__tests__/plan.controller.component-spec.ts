import { json, urlencoded } from 'express';
import request from 'supertest';
import { Server } from 'http';

import App from '../../app';
import PlanController from '../plan.controller';
import { giveUserProps } from '../../../shared/mocks';
import {
  MaritalStatusEnum,
  OwnershipStatusEnum
} from '../../../domain/user/user.entity';
import { OpenApiValidatorMiddleware } from '../../middlewares/openApi.middleware';
import errorHandler from '../../middlewares/errorHandler.middleware';
import { makePlanService } from '../../../shared/factory';

const planService = makePlanService();

const app = new App({
  port: 3000,
  middleWares: [
    json(),
    urlencoded({ extended: true }),
    OpenApiValidatorMiddleware,
    errorHandler
  ],
  controllers: [new PlanController(planService)]
});

let server: Server;

beforeAll(() => {
  server = app.listen();
});

const plansOrEligibility = {
  auto: 'regular',
  disability: 'ineligible',
  home: 'economic',
  life: 'regular'
};

afterAll(() => {
  server.close();
});

describe('POST /plans/suggestions', () => {
  const body = giveUserProps({
    age: 35,
    dependents: 2,
    house: { ownership_status: OwnershipStatusEnum.OWNED },
    income: 0,
    marital_status: MaritalStatusEnum.MARRIED,
    risk_questions: [0, 1, 0],
    vehicle: { year: 2018 }
  });

  it('given a valid body should return plans or eligibility from service', (done) => {
    request(server)
      .post('/plans/suggestions')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual(plansOrEligibility);

        done();
      })
      .catch((err) => done(err));
  });

  it('given a invalid user data should return 400', (done) => {
    const spyPlanService = jest.spyOn(planService, 'findPlanOrEligibility');

    request(server)
      .post('/plans/suggestions')
      .send({ ...body, risk_questions: [true, false, false] })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((result) => {
        expect(result.status).toBe(400);
        expect(spyPlanService).not.toHaveBeenCalled();

        done();
      })
      .catch((err) => done(err));
  });

  it('given an exception from planService should return 500', (done) => {
    const error = new Error('something bad happened');

    const spyPlanService = jest
      .spyOn(planService, 'findPlanOrEligibility')
      .mockImplementation(() => {
        throw error;
      });

    request(server)
      .post('/plans/suggestions')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((result) => {
        expect(result.status).toBe(500);
        expect(spyPlanService).toHaveBeenCalled();

        done();
      })
      .catch((err) => done(err));
  });
});
