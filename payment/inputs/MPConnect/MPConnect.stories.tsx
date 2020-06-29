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

export const disconnected = () => (
  <MPConnect
    id={faker.random.uuid()}
    slug={faker.internet.userName()}
    onChange={action("changed")}
  />
);

export const connecting = () => (
  <MPConnect
    isLoading
    id={faker.random.uuid()}
    slug={faker.internet.userName()}
    onChange={action("changed")}
  />
);

export const disconnecting = () => (
  <MPConnect
    checked
    isLoading
    id={faker.random.uuid()}
    slug={faker.internet.userName()}
    onChange={action("changed")}
  />
);

export default {title: "Payment/Inputs/MPConnect"};
