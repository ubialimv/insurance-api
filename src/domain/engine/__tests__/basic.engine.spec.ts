import faker from '@faker-js/faker';
import { giveUser } from '../../../shared/mocks';
import { UserProps } from '../../user/user.entity';
import BasicEngine, { EligibilityEnum, PlanEnum, Rule } from '../basic.engine';
import { Operation } from '../operations';

class MyEngine extends BasicEngine {}
const myEngine = new MyEngine();

describe('Basic Engine', () => {
  describe('calculateRiskScore', () => {
    let operation: Operation;
    let rule: Rule;

    beforeEach(() => {
      operation = jest.fn();
      rule = jest.fn();
    });

    it('given a call should execute rule function', () => {
      myEngine.calculateRiskScore(rule, { rankScore: 0 }, operation);
      expect(rule).toHaveBeenCalled();
    });

    it('given a call when rule returns true should execute operation function', () => {
      const riskPoint = 10;
      const rankScore = 0;
      rule = jest.fn().mockReturnValue(true);
      myEngine.calculateRiskScore(rule, { rankScore }, operation, riskPoint);
      expect(operation).toHaveBeenCalledWith(rankScore, riskPoint);
    });

    it('given a call when rule returns false should not execute operation function', () => {
      const rankScore = 0;
      rule = jest.fn().mockReturnValue(false);
      myEngine.calculateRiskScore(rule, { rankScore }, operation);
      expect(operation).not.toHaveBeenCalled();
    });

    it('given a call when rule returns true should change de rankScore', () => {
      const riskPoint = 10;
      const score = { rankScore: 0 };
      const operationResult = -1;

      rule = jest.fn().mockReturnValue(true);
      operation = jest.fn().mockReturnValue(operationResult);

      myEngine.calculateRiskScore(rule, score, operation, riskPoint);
      expect(score.rankScore).toEqual(operationResult);
    });
  });

  describe('findPlan', () => {
    it('when rankScore is greater than 3 should return responsible', () => {
      const score = { rankScore: 3 };
      const plan = myEngine.findPlan(score);
      expect(plan).toBe(PlanEnum.RESPONSIBLE);
    });

    it('when rankScore is between 1 or 2 should return regular', () => {
      const score = { rankScore: 1 };
      const plan = myEngine.findPlan(score);
      expect(plan).toBe(PlanEnum.REGULAR);
    });

    it('when rankScore is less or equal to 0 should return economic', () => {
      const score = { rankScore: 0 };
      const plan = myEngine.findPlan(score);
      expect(plan).toBe(PlanEnum.ECONOMIC);
    });
  });

  describe('calculateBaseScore', () => {
    it('base score should be calculated base on risk questions', () => {
      const userData: Pick<UserProps, 'risk_questions'> = {
        risk_questions: [
          faker.random.arrayElement([0, 1]),
          faker.random.arrayElement([0, 1]),
          faker.random.arrayElement([0, 1])
        ]
      };
      const user = giveUser(userData);

      const baseScore = myEngine.calculateBaseScore(user);
      expect(baseScore).toStrictEqual({
        rankScore: userData.risk_questions.filter((x) => x === 1).length
      });
    });
  });

  describe('findEligibility', () => {
    it('when at least one rule is returning false should return ineligible', () => {
      const rules: Array<Rule> = [
        jest.fn().mockReturnValue(true),
        jest.fn().mockReturnValue(false)
      ];

      const eligibility = myEngine.findEligibility(rules);
      expect(eligibility).toBe(EligibilityEnum.INELIGIBLE);
    });
    it('when all rules are returning true should return eligible', () => {
      const rules: Array<Rule> = [
        jest.fn().mockReturnValue(true),
        jest.fn().mockReturnValue(true)
      ];

      const eligibility = myEngine.findEligibility(rules);
      expect(eligibility).toBe(EligibilityEnum.ELIGIBLE);
    });
  });
});
