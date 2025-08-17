import User from "./user.type";
import {faker} from "@faker-js/faker";

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    avatar: faker.image.avatar(),
    
  };
}

export const mockUsers: User[]  = faker.helpers.multiple(createRandomUser, {
  count: 100,
});