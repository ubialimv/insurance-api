import User from '../../user/user.entity';
import add from '../operations/add.operation';
import SpecializedEngine from './specialized.engine';

export default class HomeEngine extends SpecializedEngine {
  findPlanOrEligibility(user: User) {
    return this.run(
      user,
      [user.hasHouse.bind(user)],
      [
        {
          operation: add,
          riskPoint: 1,
          rule: user.hasHouseAndIsMortgaged.bind(user)
        }
      ]
    );
  }
}
