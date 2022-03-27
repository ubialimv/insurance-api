import User from '../../user/user.entity';
import add from '../operations/add.operation';
import SpecializedEngine from './specialized.engine';

export default class AutoEngine extends SpecializedEngine {
  findPlanOrEligibility(user: User) {
    return this.run(
      user,
      [user.hasVehicle.bind(user)],
      [
        {
          operation: add,
          riskPoint: 1,
          rule: user.hasVehicleAndWasProducedInLast5Years.bind(user)
        }
      ]
    );
  }
}
