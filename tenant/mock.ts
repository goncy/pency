import faker from "faker";
import shortid from "shortid";

import {Tenant} from "./types";

export default {
  get full(): Tenant {
    return {
      id: shortid.generate(),
      color: "cyan",
      slug: faker.internet.userName(),
      twitter: faker.internet.userName(),
      instagram: faker.internet.userName(),
      facebook: faker.internet.userName(),
      logo: "//placehold.it/128x128",
      banner: "//placehold.it/256x128",
      title: faker.company.companyName(),
      description: faker.lorem.lines(2),
      phone: faker.phone.phoneNumber("##########"),
    };
  },
};
