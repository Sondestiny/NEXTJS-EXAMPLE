import {faker} from "@faker-js/faker";
import { User } from "./user.type";

function createRandomUser() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.image.avatar(),
    
  };
}
export const mockUsers : User[] = [];
for (let index = 0; index < 20; index++) {
  mockUsers.push(createRandomUser());
}