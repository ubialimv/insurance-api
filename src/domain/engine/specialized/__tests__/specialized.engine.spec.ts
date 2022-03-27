import { giveUser } from '../../../../shared/mocks';
import { EligibilityEnum, BasicEngineInterface } from '../../basic.engine';
import SpecializedEngine from '../../specialized/specialized.engine';

const EngineMock = jest.fn<BasicEngineInterface, []>();
const engine = new EngineMock();

const specializedEngine = new SpecializedEngine(engine);
const user = giveUser();

beforeEach(() => {
  engine.findEligibility = jest.fn();
  engine.calculateBaseScore = jest.fn();
  engine.calculateRiskScore = jest.fn();
  engine.findPlan = jest.fn();
});

describe('Specialized Engine', () => {
  describe('findPlanOrEligibility', () => {
    it('should call engine.findEligibility', () => {
      const eligibilityFunctions = [jest.fn()];
      specializedEngine.run(user, eligibilityFunctions, [
        {
          operation: jest.fn(),
          riskPoint: 1,
          rule: jest.fn()
        }
      ]);

      expect(engine.findEligibility).toHaveBeenCalledWith(eligibilityFunctions);
    });

    describe('when user is eligible', () => {
      beforeEach(() => {
        engine.findEligibility = jest
          .fn()
          .mockReturnValue(EligibilityEnum.ELIGIBLE);
      });

      it('should call engine.calculateBaseScore', () => {
        specializedEngine.run(
          user,
          [jest.fn()],
          [
            {
              operation: jest.fn(),
              riskPoint: 1,
              rule: jest.fn()
            }
          ]
        );

        expect(engine.calculateBaseScore).toHaveBeenCalledWith(user);
      });

      it('should call engine.calculateRiskScore', () => {
        const score = { rankScore: 11 };
        engine.calculateBaseScore = jest.fn().mockReturnValue(score);

        const scoreCalculations = [
          {
            operation: jest.fn(),
            riskPoint: 1,
            rule: jest.fn()
          }
        ];

        specializedEngine.run(user, [jest.fn()], scoreCalculations);

        scoreCalculations.forEach((scoreCalculation) => {
          expect(engine.calculateRiskScore).toHaveBeenCalledWith(
            scoreCalculation.rule,
            score,
            scoreCalculation.operation,
            scoreCalculation.riskPoint
          );
        });
      });

      it('should call engine.findPlan', () => {
        const score = { rankScore: 6 };
        engine.calculateBaseScore = jest.fn().mockReturnValue(score);

        specializedEngine.run(
          user,
          [jest.fn()],
          [
            {
              operation: jest.fn(),
              riskPoint: 1,
              rule: jest.fn()
            }
          ]
        );

        expect(engine.findPlan).toHaveBeenCalledWith(score);
      });
    });

    describe('when user is not eligible', () => {
      beforeEach(() => {
        engine.findEligibility = jest
          .fn()
          .mockReturnValue(EligibilityEnum.INELIGIBLE);
      });

      it('should not call engine.calculateBaseScore', () => {
        specializedEngine.run(
          user,
          [jest.fn()],
          [
            {
              operation: jest.fn(),
              riskPoint: 1,
              rule: jest.fn()
            }
          ]
        );

        expect(engine.calculateBaseScore).not.toHaveBeenCalled();
      });

      it('should not call engine.calculateRiskScore', () => {
        specializedEngine.run(
          user,
          [jest.fn()],
          [
            {
              operation: jest.fn(),
              riskPoint: 1,
              rule: jest.fn()
            }
          ]
        );

        expect(engine.calculateRiskScore).not.toHaveBeenCalled();
      });

      it('should not call engine.findPlan', () => {
        specializedEngine.run(
          user,
          [jest.fn()],
          [
            {
              operation: jest.fn(),
              riskPoint: 1,
              rule: jest.fn()
            }
          ]
        );

        expect(engine.findPlan).not.toHaveBeenCalled();
      });
    });
  });
});
