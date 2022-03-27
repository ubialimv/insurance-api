import { giveUser } from '../../../../shared/mocks';
import { EligibilityEnum } from '../../basic.engine';
import { makeCommonRuleEngine } from '../../../../shared/factory';
import LifeEngine from '../life.engine';
import * as add from '../../operations/add.operation';

const commonRulesEngine = makeCommonRuleEngine();
const engine = new LifeEngine(commonRulesEngine);

const user = giveUser();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('life engine', () => {
  it('should execute isNotOver60YearsOld in order to check Eligibility', () => {
    const spy = jest.spyOn(user, 'isNotOver60YearsOld');

    engine.findPlanOrEligibility(user);
    expect(spy).toHaveBeenCalled();
  });

  describe('when user is not eligible', () => {
    beforeEach(() => {
      jest
        .spyOn(commonRulesEngine, 'findEligibility')
        .mockReturnValue(EligibilityEnum.INELIGIBLE);
    });

    it('should not execute hasDependents', () => {
      const spy = jest.spyOn(user, 'hasDependents');

      engine.findPlanOrEligibility(user);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not execute isMarried', () => {
      const spy = jest.spyOn(user, 'isMarried');

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

    it('should calculate score based on hasDependents returning true', () => {
      jest
        .spyOn(commonRulesEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: 0 });

      jest.spyOn(user, 'isMarried').mockReturnValue(false);

      const spy = jest.spyOn(user, 'hasDependents').mockReturnValue(true);

      const spyAdd = jest.spyOn(add, 'default');

      engine.findPlanOrEligibility(user);
      expect(spy).toHaveBeenCalled();
      expect(spyAdd).toHaveBeenCalledWith(0, 1);
    });

    it('should calculate score based on isMarried returning true', () => {
      jest
        .spyOn(commonRulesEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: -1 });

      jest.spyOn(user, 'hasDependents').mockReturnValue(false);

      const spy = jest.spyOn(user, 'isMarried').mockReturnValue(true);

      const spyAdd = jest.spyOn(add, 'default');

      engine.findPlanOrEligibility(user);
      expect(spy).toHaveBeenCalled();
      expect(spyAdd).toHaveBeenCalledWith(-1, 1);
    });
  });
});
