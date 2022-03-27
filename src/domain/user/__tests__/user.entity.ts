export enum OwnershipStatusEnum {
  OWNED = 'owned',
  MORTGAGED = 'mortgaged'
}

type OwnershipStatus =
  | OwnershipStatusEnum.OWNED
  | OwnershipStatusEnum.MORTGAGED;

type House = {
  ownershipStatus: OwnershipStatus;
};

export enum MaritalStatusEnum {
  SINGLE = 'single',
  MARRIED = 'married'
}

type MaritalStatus = MaritalStatusEnum.SINGLE | MaritalStatusEnum.MARRIED;

export enum RiskAnswerEnum {
  FALSE = 0,
  TRUE = 1
}

type RiskAnswer = RiskAnswerEnum.FALSE | RiskAnswerEnum.TRUE;

export type RiskQuestions = [RiskAnswer, RiskAnswer, RiskAnswer];

type Vehicle = {
  year: number;
};

export type HouseProps = {
  ownership_status: OwnershipStatus;
};

export type UserProps = {
  age: number;
  dependents: number;
  income: number;
  marital_status: MaritalStatus;
  risk_questions: RiskQuestions;
  house?: HouseProps;
  vehicle?: Vehicle;
};

export default class User {
  private readonly age: number;
  private readonly dependents: number;
  private readonly income: number;
  private readonly maritalStatus: MaritalStatus;
  public readonly riskQuestions: RiskQuestions;
  private readonly house?: House;
  private readonly vehicle?: Vehicle;

  constructor(props: UserProps) {
    this.age = props.age;
    this.dependents = props.dependents;
    this.income = props.income;
    this.maritalStatus = props.marital_status;
    this.riskQuestions = props.risk_questions;

    if (props.house) {
      this.house = {
        ownershipStatus: props.house.ownership_status
      };
    }

    this.vehicle = props.vehicle;
  }

  hasIncome() {
    return this.income > 0;
  }

  hasHouse() {
    return this.house !== undefined;
  }

  hasVehicle() {
    return this.vehicle !== undefined;
  }

  isNotOver60YearsOld() {
    return this.age <= 60;
  }

  isUnder30YearsOld() {
    return this.age < 30;
  }

  hasAgeBetween30And40() {
    return this.age >= 30 && this.age <= 40;
  }

  hasIncomeAbove200k() {
    return this.income > 2000 * 100;
  }

  hasHouseAndIsMortgaged() {
    return this.house?.ownershipStatus === 'mortgaged';
  }

  hasDependents() {
    return this.dependents > 0;
  }

  isMarried() {
    return this.maritalStatus === 'married';
  }

  hasVehicleAndWasProducedInLast5Years() {
    if (this.vehicle === undefined) return false;

    const vehicleYear = this.vehicle.year;
    const currentYear = new Date().getFullYear();
    return currentYear - vehicleYear <= 5;
  }
}