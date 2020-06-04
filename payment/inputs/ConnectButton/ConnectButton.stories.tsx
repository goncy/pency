import React from "react";
import {action} from "@storybook/addon-actions";
import faker from "faker";

import ConnectButton from "./ConnectButton";

export const connected = () => (
  <ConnectButton id={faker.random.uuid()} value={true} onChange={action("changed")} />
);

export default {title: "Payment/Inputs/ConnectButton"};
