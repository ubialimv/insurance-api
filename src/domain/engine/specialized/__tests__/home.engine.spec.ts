import { giveUser } from '../../../../shared/mocks';
import { EligibilityEnum } from '../../basic.engine';
import { makeCommonRuleEngine } from '../../../../shared/factory';
import HomeEngine from '../../specialized/home.engine';
import * as add from '../../operations/add.operation';

const commonRulesEngine = makeCommonRuleEngine();
const engine = new HomeEngine(commonRulesEngine);

const user = giveUser();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('home engine', () => {
  it('should execute hasHouse in order to check Eligibility', () => {
    const spy = jest.spyOn(user, 'hasHouse');

    engine.findPlanOrEligibility(user);
    expect(spy).toHaveBeenCalled();
  });

  describe('when user is not eligible', () => {
    beforeEach(() => {
      jest
        .spyOn(commonRulesEngine, 'findEligibility')
        .mockReturnValue(EligibilityEnum.INELIGIBLE);
    });

    it('should not execute hasHouseAndIsMortgaged', () => {
      const spy = jest.spyOn(user, 'hasHouseAndIsMortgaged');

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

    it('should calculate score based on hasHouseAndIsMortgaged returning true', () => {
      jest
        .spyOn(commonRulesEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: 0 });

      const spy = jest
        .spyOn(user, 'hasHouseAndIsMortgaged')
        .mockReturnValue(true);

      const spyAdd = jest.spyOn(add, 'default');

      engine.findPlanOrEligibility(user);
      expect(spy).toHaveBeenCalled();
      expect(spyAdd).toHaveBeenCalledWith(0, 1);
    });
  });
});
