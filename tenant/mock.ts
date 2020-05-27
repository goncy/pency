import faker from "faker";

import {Tenant} from "./types";

export default (overrides: Partial<Tenant> = {}) => ({
  color: "cyan",
  twitter: faker.internet.userName(),
  instagram: faker.internet.userName(),
  facebook: faker.internet.userName(),
  logo: "//placehold.it/128x128",
  banner: "//placehold.it/256x128",
  title: faker.company.companyName(),
  description: faker.lorem.lines(2),
  phone: Number(faker.phone.phoneNumber("##########")),
  ...overrides,
});
