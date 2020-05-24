import React from "react";
import faker from "faker";

import TenantHeader from "./TenantHeader";

const TENANT = {
  twitter: faker.internet.userName(),
  instagram: faker.internet.userName(),
  facebook: faker.internet.userName(),
  logo: "//placehold.it/128x128",
  banner: "//placehold.it/256x128",
  title: faker.company.companyName(),
  description: faker.lorem.lines(2),
  phone: Number(faker.phone.phoneNumber("##########")),
};

export const full = () => <TenantHeader tenant={TENANT} />;

export default {title: "TenantHeader"};
