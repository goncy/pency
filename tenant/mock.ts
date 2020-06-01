import faker from "faker";

import {Tenant} from "./types";

export default {
  get full(): Tenant {
    return {
      id: faker.random.uuid(),
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
      category: faker.commerce.department(),
      highlight: faker.lorem.words(10),
      keywords: `${faker.commerce.department()}, ${faker.commerce.department()}`,
      fields: [
        {
          id: faker.random.uuid(),
          title: "Métodos de pago",
          type: "radio",
          options: [
            {id: faker.random.uuid(), title: "Efectivo", note: "20% Off"},
            {id: faker.random.uuid(), title: "Tarjeta de débito", note: "10% Off"},
            {id: faker.random.uuid(), title: "Tarjeta de crédito", note: ""},
          ],
        },
        {
          id: faker.random.uuid(),
          title: "Dirección de entrega",
          type: "text",
          note: "Solo se entrega en zona sur",
        },
      ],
    };
  },
};
