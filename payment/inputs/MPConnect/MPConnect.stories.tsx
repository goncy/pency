import React from "react";
import {action} from "@storybook/addon-actions";
import faker from "faker";

import MPConnect from "./MPConnect";

export const connected = () => (
  <MPConnect
    checked
    id={faker.random.uuid()}
    slug={faker.internet.userName()}
    onChange={action("changed")}
  />
);

export default {title: "Payment/Inputs/MPConnect"};
