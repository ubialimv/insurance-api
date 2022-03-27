import User from '../user/user.entity';
import { EligibilityEnum, Plan } from './basic.engine';

export interface EngineInterface {
  findPlanOrEligibility(user: User): EligibilityEnum.INELIGIBLE | Plan;
}
