import { faker } from '@faker-js/faker';
import User, {
  UserProps,
  MaritalStatusEnum,
  OwnershipStatusEnum
} from '../../domain/user/user.entity';

export function giveUserProps(data?: Partial<UserProps>): UserProps {
  const userProps: UserProps = {
    age: faker.datatype.number({ min: 0 }),
    dependents: faker.datatype.number({ min: 0 }),
    income: faker.datatype.number({ min: 0 }),
    marital_status: faker.random.arrayElement([
      MaritalStatusEnum.MARRIED,
      MaritalStatusEnum.SINGLE
    ]),
    risk_questions: [
      faker.random.arrayElement([0, 1]),
      faker.random.arrayElement([0, 1]),
      faker.random.arrayElement([0, 1])
    ],
    house: faker.random.arrayElement([
      undefined,
      {
        ownership_status: faker.random.arrayElement([
          OwnershipStatusEnum.MORTGAGED,
          OwnershipStatusEnum.OWNED
        ])
      }
    ]),
    vehicle: faker.random.arrayElement([
      undefined,
      {
        year: faker.datatype.number({ min: 1970 })
      }
    ])
  };

  return Object.assign(userProps, data);
}

export function giveUser(data?: Partial<UserProps>): User {
  return new User(Object.assign(giveUserProps(), data));
}
