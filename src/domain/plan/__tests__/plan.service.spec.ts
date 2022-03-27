import { giveUser } from '../../../shared/mocks';
import { EngineInterface } from '../../engine';
import UserService from '../plan.service';

const EngineMock = jest.fn<EngineInterface, []>();

const autoEngine = new EngineMock();
const disabilityEngine = new EngineMock();
const homeEngine = new EngineMock();
const lifeEngine = new EngineMock();

const userService = new UserService(
  autoEngine,
  disabilityEngine,
  homeEngine,
  lifeEngine
);

const user = giveUser();

beforeEach(() => {
  autoEngine.findPlanOrEligibility = jest.fn();
  disabilityEngine.findPlanOrEligibility = jest.fn();
  homeEngine.findPlanOrEligibility = jest.fn();
  lifeEngine.findPlanOrEligibility = jest.fn();
});

describe('User Service', () => {
  describe('findPlanOrEligibility', () => {
    it('should call findPlanOrEligibility from autoEngine', () => {
      userService.findPlanOrEligibility(user);
      expect(autoEngine.findPlanOrEligibility).toHaveBeenCalledWith(user);
    });

    it('should call findPlanOrEligibility from disabilityEngine', () => {
      userService.findPlanOrEligibility(user);
      expect(disabilityEngine.findPlanOrEligibility).toHaveBeenCalledWith(user);
    });

    it('should call findPlanOrEligibility from homeEngine', () => {
      userService.findPlanOrEligibility(user);
      expect(homeEngine.findPlanOrEligibility).toHaveBeenCalledWith(user);
    });

    it('should call findPlanOrEligibility from lifeEngine', () => {
      userService.findPlanOrEligibility(user);
      expect(lifeEngine.findPlanOrEligibility).toHaveBeenCalledWith(user);
    });

    it('should return a plan or eligibility from each engine', () => {
      const result = {
        auto: 'regular',
        disability: 'ineligible',
        home: 'economic',
        life: 'regular'
      };

      autoEngine.findPlanOrEligibility = jest.fn().mockReturnValue(result.auto);
      disabilityEngine.findPlanOrEligibility = jest
        .fn()
        .mockReturnValue(result.disability);
      homeEngine.findPlanOrEligibility = jest.fn().mockReturnValue(result.home);
      lifeEngine.findPlanOrEligibility = jest.fn().mockReturnValue(result.life);

      const planOrEligibility = userService.findPlanOrEligibility(user);
      expect(planOrEligibility).toStrictEqual(result);
    });
  });
});
