import User from '../../user/user.entity';
import {
  EligibilityEnum,
  BasicEngineInterface,
  Plan,
  Rule,
  ScoreCalculations
} from '../basic.engine';

export default class SpecializedEngine {
  constructor(private readonly engine: BasicEngineInterface) {}

  public run(
    user: User,
    eligibilityFunctions: Array<Rule>,
    scoreCalculations: Array<ScoreCalculations>
  ): EligibilityEnum.INELIGIBLE | Plan {
    const eligibility = this.engine.findEligibility(eligibilityFunctions);

    if (eligibility === 'eligible') {
      const score = this.engine.calculateBaseScore(user);

      scoreCalculations.forEach((scoreCalculation) => {
        this.engine.calculateRiskScore(
          scoreCalculation.rule,
          score,
          scoreCalculation.operation,
          scoreCalculation.riskPoint
        );
      });

      return this.engine.findPlan(score);
    }

    return eligibility;
  }
}
