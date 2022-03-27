import { EngineInterface } from '../engine';
import { EligibilityEnum, Plan } from '../engine/basic.engine';
import User from '../user/user.entity';

export interface PlanServiceInterface {
  findPlanOrEligibility(user: User): {
    auto: EligibilityEnum.INELIGIBLE | Plan;
    disability: EligibilityEnum.INELIGIBLE | Plan;
    home: EligibilityEnum.INELIGIBLE | Plan;
    life: EligibilityEnum.INELIGIBLE | Plan;
  };
}

export default class PlanService implements PlanServiceInterface {
  constructor(
    private readonly autoEngine: EngineInterface,
    private readonly disabilityEngine: EngineInterface,
    private readonly homeEngine: EngineInterface,
    private readonly lifeEngine: EngineInterface
  ) {}

  findPlanOrEligibility(user: User) {
    const auto = this.autoEngine.findPlanOrEligibility(user);
    const disability = this.disabilityEngine.findPlanOrEligibility(user);
    const home = this.homeEngine.findPlanOrEligibility(user);
    const life = this.lifeEngine.findPlanOrEligibility(user);

    return {
      auto,
      disability,
      home,
      life
    };
  }
}
