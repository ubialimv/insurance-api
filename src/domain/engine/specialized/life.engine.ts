import User from '../../user/user.entity';
import add from '../operations/add.operation';
import SpecializedEngine from './specialized.engine';

export default class LifeEngine extends SpecializedEngine {
  findPlanOrEligibility(user: User) {
    return this.run(
      user,
      [user.isNotOver60YearsOld.bind(user)],
      [
        {
          operation: add,
          riskPoint: 1,
          rule: user.hasDependents.bind(user)
        },
        {
          operation: add,
          riskPoint: 1,
          rule: user.isMarried.bind(user)
        }
      ]
    );
  }
}
