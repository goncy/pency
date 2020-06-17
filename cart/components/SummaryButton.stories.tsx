import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../mock";

import SummaryButton from "./SummaryButton";

export const full = () => (
  <SummaryButton items={mock.items} maxWidth="320px" onClick={action("clicked")}>
    Tu pedido
  </SummaryButton>
);

export default {title: "Cart/Components/SummaryButton"};
