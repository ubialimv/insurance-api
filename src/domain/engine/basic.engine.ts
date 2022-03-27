import User from '../user/user.entity';
import { Operation } from './operations';

export enum PlanEnum {
  ECONOMIC = 'economic',
  REGULAR = 'regular',
  RESPONSIBLE = 'responsible'
}

export type Plan = PlanEnum.ECONOMIC | PlanEnum.REGULAR | PlanEnum.RESPONSIBLE;

export enum EligibilityEnum {
  INELIGIBLE = 'ineligible',
  ELIGIBLE = 'eligible'
}

export type Eligibility = EligibilityEnum.INELIGIBLE | EligibilityEnum.ELIGIBLE;

export type Rule = () => boolean;

export type Score = {
  rankScore: number;
};

export type ScoreCalculations = {
  rule: Rule;
  operation: Operation;
  riskPoint: number;
};

export interface BasicEngineInterface {
  calculateRiskScore(
    rule: Rule,
    score: Score,
    operation: Operation,
    riskPoint: number
  ): void;

  findPlan(score: Score): Plan;

  calculateBaseScore(user: User): Score;

  findEligibility(rules: Array<Rule>): Eligibility;
}

export default class BasicEngine implements BasicEngineInterface {
  public calculateRiskScore(
    rule: Rule,
    score: Score,
    operation: Operation,
    riskPoint = 1
  ) {
    if (rule()) {
      score.rankScore = operation(score.rankScore, riskPoint);
    }
  }

  public findPlan(score: Score): Plan {
    if (score.rankScore >= 3) {
      return PlanEnum.RESPONSIBLE;
    } else if (score.rankScore > 0) {
      return PlanEnum.REGULAR;
    } else {
      return PlanEnum.ECONOMIC;
    }
  }

  public calculateBaseScore(user: User): Score {
    const rankScore = user.riskQuestions.filter((x) => x === 1).length;
    return { rankScore };
  }

  public findEligibility(rules: Array<Rule>): Eligibility {
    const isEligible = rules.every((func) => func());
    return isEligible ? EligibilityEnum.ELIGIBLE : EligibilityEnum.INELIGIBLE;
  }
}
