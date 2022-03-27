import User from '../../user/user.entity';
import add from '../operations/add.operation';
import deduct from '../operations/deduct.operation';
import SpecializedEngine from './specialized.engine';

export default class DisabilityEngine extends SpecializedEngine {
  findPlanOrEligibility(user: User) {
    return this.run(
      user,
      [user.hasIncome.bind(user), user.isNotOver60YearsOld.bind(user)],
      [
        {
          operation: add,
          riskPoint: 1,
          rule: user.hasHouseAndIsMortgaged.bind(user)
        },
        {
          operation: add,
          riskPoint: 1,
          rule: user.hasDependents.bind(user)
        },
        {
          operation: deduct,
          riskPoint: 1,
          rule: user.isMarried.bind(user)
        }
      ]
    );
  }
}
