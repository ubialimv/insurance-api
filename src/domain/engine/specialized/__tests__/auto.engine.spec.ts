import { giveUser } from '../../../../shared/mocks';
import { EligibilityEnum } from '../../basic.engine';
import AutoEngine from '../../specialized/auto.engine';
import { makeCommonRuleEngine } from '../../../../shared/factory';
import * as add from '../../operations/add.operation';

const commonRulesEngine = makeCommonRuleEngine();
const engine = new AutoEngine(commonRulesEngine);

const user = giveUser();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('auto engine', () => {
  it('should execute hasVehicle in order to check Eligibility', () => {
    const spy = jest.spyOn(user, 'hasVehicle');

    engine.findPlanOrEligibility(user);
    expect(spy).toHaveBeenCalled();
  });

  describe('when user is not eligible', () => {
    beforeEach(() => {
      jest
        .spyOn(commonRulesEngine, 'findEligibility')
        .mockReturnValue(EligibilityEnum.INELIGIBLE);
    });

    it('should not execute hasVehicleAndWasProducedInLast5Years', () => {
      const spy = jest.spyOn(user, 'hasVehicleAndWasProducedInLast5Years');

      engine.findPlanOrEligibility(user);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when user is eligible', () => {
    beforeEach(() => {
      jest
        .spyOn(commonRulesEngine, 'findEligibility')
        .mockReturnValue(EligibilityEnum.ELIGIBLE);
    });

    it('should calculate score based on hasVehicleAndWasProducedInLast5Years returning true', () => {
      jest
        .spyOn(commonRulesEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: 0 });

      const spy = jest
        .spyOn(user, 'hasVehicleAndWasProducedInLast5Years')
        .mockReturnValue(true);

      const spyAdd = jest.spyOn(add, 'default');

      engine.findPlanOrEligibility(user);
      expect(spy).toHaveBeenCalled();
      expect(spyAdd).toHaveBeenCalledWith(0, 1);
    });
  });
});
