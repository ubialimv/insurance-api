import User from '../user/user.entity';
import {
  Eligibility,
  BasicEngineInterface,
  Plan,
  Rule,
  Score
} from './basic.engine';
import { Operation } from './operations';
import deduct from './operations/deduct.operation';

export default class CommonRulesEngine implements BasicEngineInterface {
  constructor(private readonly engine: BasicEngineInterface) {}

  public calculateBaseScore(user: User): Score {
    const score = this.engine.calculateBaseScore(user);

    this.calculateRiskScore(
      user.isUnder30YearsOld.bind(user),
      score,
      deduct,
      2
    );

    this.calculateRiskScore(
      user.hasAgeBetween30And40.bind(user),
      score,
      deduct,
      1
    );

    this.calculateRiskScore(
      user.hasIncomeAbove200k.bind(user),
      score,
      deduct,
      1
    );

    return score;
  }

  calculateRiskScore(
    rule: Rule,
    score: Score,
    operation: Operation,
    riskPoint: number
  ): void {
    return this.engine.calculateRiskScore(rule, score, operation, riskPoint);
  }

  findPlan(score: Score): Plan {
    return this.engine.findPlan(score);
  }

  findEligibility(rules: Rule[]): Eligibility {
    return this.engine.findEligibility(rules);
  }
}
