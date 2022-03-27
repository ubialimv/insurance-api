import { giveUser } from '../../../shared/mocks';
import BasicEngine from '../basic.engine';
import CommonRulesEngine from '../common-rules.engine';
import * as deduct from '../operations/deduct.operation';

const basicEngine = new BasicEngine();
const commonRulesEngine = new CommonRulesEngine(basicEngine);

describe('Common Engine', () => {
  describe('calculateBaseScore', () => {
    const user = giveUser();

    it('should calculate score based on isUnder30YearsOld returning true', () => {
      jest
        .spyOn(basicEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: 0 });

      jest.spyOn(user, 'hasAgeBetween30And40').mockReturnValue(false);
      jest.spyOn(user, 'hasIncomeAbove200k').mockReturnValue(false);

      const spy = jest.spyOn(user, 'isUnder30YearsOld').mockReturnValue(true);

      const spyDeduct = jest.spyOn(deduct, 'default');

      commonRulesEngine.calculateBaseScore(user);
      expect(spy).toHaveBeenCalled();
      expect(spyDeduct).toHaveBeenCalledWith(0, 2);
    });

    it('should calculate score based on hasAgeBetween30And40 returning true', () => {
      jest
        .spyOn(basicEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: -1 });

      jest.spyOn(user, 'isUnder30YearsOld').mockReturnValue(false);
      jest.spyOn(user, 'hasIncomeAbove200k').mockReturnValue(false);

      const spy = jest
        .spyOn(user, 'hasAgeBetween30And40')
        .mockReturnValue(true);

      const spyDeduct = jest.spyOn(deduct, 'default');

      commonRulesEngine.calculateBaseScore(user);
      expect(spy).toHaveBeenCalled();
      expect(spyDeduct).toHaveBeenCalledWith(-1, 1);
    });

    it('should calculate score based on hasIncomeAbove200k returning true', () => {
      jest
        .spyOn(basicEngine, 'calculateBaseScore')
        .mockReturnValue({ rankScore: -2 });

      jest.spyOn(user, 'isUnder30YearsOld').mockReturnValue(false);
      jest.spyOn(user, 'hasAgeBetween30And40').mockReturnValue(false);

      const spy = jest.spyOn(user, 'hasIncomeAbove200k').mockReturnValue(true);

      const spyDeduct = jest.spyOn(deduct, 'default');

      commonRulesEngine.calculateBaseScore(user);
      expect(spy).toHaveBeenCalled();
      expect(spyDeduct).toHaveBeenCalledWith(-2, 1);
    });
  });

  it('should bypass to calculateRiskScore from engine', () => {
    jest.spyOn(basicEngine, 'calculateRiskScore');
    const ruleMock = jest.fn();
    const operationMock = jest.fn();

    commonRulesEngine.calculateRiskScore(
      ruleMock,
      { rankScore: 3 },
      operationMock,
      1
    );

    expect(basicEngine.calculateRiskScore).toHaveBeenCalledWith(
      ruleMock,
      { rankScore: 3 },
      operationMock,
      1
    );
  });

  it('should bypass to findPlan from engine', () => {
    const score = { rankScore: 2 };
    jest.spyOn(basicEngine, 'findPlan');

    commonRulesEngine.findPlan(score);

    expect(basicEngine.findPlan).toHaveBeenCalledWith(score);
  });

  it('should bypass to findEligibility from engine', () => {
    const ruleMock = jest.fn();
    jest.spyOn(basicEngine, 'findEligibility');

    commonRulesEngine.findEligibility([ruleMock]);

    expect(basicEngine.findEligibility).toHaveBeenCalledWith([ruleMock]);
  });
});
