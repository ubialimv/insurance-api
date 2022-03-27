import faker from '@faker-js/faker';
import { giveUser } from '../../../shared/mocks';
import { MaritalStatusEnum, OwnershipStatusEnum } from '../user.entity';

describe('User entity', () => {
  describe('hasIncome', () => {
    it('when user has income greater than 0 should return true', () => {
      const user = giveUser({ income: 80000 });

      expect(user.hasIncome()).toBeTruthy();
    });
    it('when user has income equal or less than 0 should return false', () => {
      const user = giveUser({ income: 0 });

      expect(user.hasIncome()).toBeFalsy();
    });
  });

  describe('hasHouse', () => {
    it('when user has a house should return true', () => {
      const user = giveUser({
        house: {
          ownership_status: OwnershipStatusEnum.OWNED
        }
      });

      expect(user.hasHouse()).toBeTruthy();
    });
    it('when user has not a house should return false', () => {
      const user = giveUser({
        house: undefined
      });

      expect(user.hasHouse()).toBeFalsy();
    });
  });

  describe('hasVehicle', () => {
    it('when user has a vehicle hasVehicle should return true', () => {
      const user = giveUser({
        vehicle: {
          year: new Date().getFullYear()
        }
      });

      expect(user.hasVehicle()).toBeTruthy();
    });

    it('when user has not a vehicle hasVehicle should return false', () => {
      const user = giveUser({
        vehicle: undefined
      });

      expect(user.hasVehicle()).toBeFalsy();
    });
  });

  describe('isNotOver60YearsOld', () => {
    it('when user age is not over 60 years old should return true', () => {
      const user = giveUser({
        age: 60
      });

      expect(user.isNotOver60YearsOld()).toBeTruthy();
    });

    it('when user age is over 60 years old should return false', () => {
      const user = giveUser({
        age: 61
      });

      expect(user.isNotOver60YearsOld()).toBeFalsy();
    });
  });

  describe('isUnder30YearsOld', () => {
    it('when user age is under 30 years old should return true', () => {
      const user = giveUser({
        age: faker.datatype.number({ max: 29 })
      });

      expect(user.isUnder30YearsOld()).toBeTruthy();
    });
    it('when user age is under 30 years old should return false', () => {
      const user = giveUser({
        age: 30
      });

      expect(user.isUnder30YearsOld()).toBeFalsy();
    });
  });

  describe('hasAgeBetween30And40', () => {
    it('when user is 30 years old return true', () => {
      const user = giveUser({
        age: 30
      });

      expect(user.hasAgeBetween30And40()).toBeTruthy();
    });

    it('when user is 40 years old return true', () => {
      const user = giveUser({
        age: 40
      });

      expect(user.hasAgeBetween30And40()).toBeTruthy();
    });
    it('when user is under 30 years old return false', () => {
      const user = giveUser({
        age: 29
      });

      expect(user.hasAgeBetween30And40()).toBeFalsy();
    });

    it('when user is over 40 years old return false', () => {
      const user = giveUser({
        age: 41
      });

      expect(user.hasAgeBetween30And40()).toBeFalsy();
    });
  });

  describe('hasIncomeAbove200k', () => {
    it('when user has income above 200k should return true', () => {
      const user = giveUser({
        income: 2001 * 100
      });

      expect(user.hasIncomeAbove200k()).toBeTruthy();
    });

    it('when user has not income above 200k should return false', () => {
      const user = giveUser({
        income: 2000 * 100
      });

      expect(user.hasIncomeAbove200k()).toBeFalsy();
    });
  });

  describe('hasHouseAndIsMortgaged', () => {
    it('when user has a house and is mortgaged should return true', () => {
      const user = giveUser({
        house: {
          ownership_status: OwnershipStatusEnum.MORTGAGED
        }
      });

      expect(user.hasHouseAndIsMortgaged()).toBeTruthy();
    });
    it('when user has a house and is not mortgaged should return false', () => {
      const user = giveUser({
        house: {
          ownership_status: OwnershipStatusEnum.OWNED
        }
      });

      expect(user.hasHouseAndIsMortgaged()).toBeFalsy();
    });

    it('when user has not a house should return false', () => {
      const user = giveUser({
        house: undefined
      });

      expect(user.hasHouseAndIsMortgaged()).toBeFalsy();
    });
  });

  describe('hasDependents', () => {
    it('when user has dependents should return true', () => {
      const user = giveUser({
        dependents: 1
      });

      expect(user.hasDependents()).toBeTruthy();
    });
    it('when user has not dependents should return false', () => {
      const user = giveUser({
        dependents: 0
      });

      expect(user.hasDependents()).toBeFalsy();
    });
  });

  describe('isMarried', () => {
    it('when user is married should return true', () => {
      const user = giveUser({
        marital_status: MaritalStatusEnum.MARRIED
      });

      expect(user.isMarried()).toBeTruthy();
    });
    it('when user is not married should return false', () => {
      const user = giveUser({
        marital_status: MaritalStatusEnum.SINGLE
      });

      expect(user.isMarried()).toBeFalsy();
    });
  });

  describe('hasVehicleAndWasProducedInLast5Years', () => {
    it('when user vehicle was produced in last 5 years should return true', () => {
      const user = giveUser({
        vehicle: {
          year: new Date().getFullYear() - 5
        }
      });

      expect(user.hasVehicleAndWasProducedInLast5Years()).toBeTruthy();
    });

    it('when user vehicle was not produced in last 5 years should return false', () => {
      const user = giveUser({
        vehicle: {
          year: new Date().getFullYear() - 6
        }
      });

      expect(user.hasVehicleAndWasProducedInLast5Years()).toBeFalsy();
    });

    it('when user has not a vehicle hasVehicle should return false', () => {
      const user = giveUser({
        vehicle: undefined
      });

      expect(user.hasVehicleAndWasProducedInLast5Years()).toBeFalsy();
    });
  });
});