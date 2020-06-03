import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import ExtraFields from "./ExtraFields";

export const empty = () => <ExtraFields value={[]} onChange={action("change")} />;
export const full = () => (
  <ExtraFields value={mock.client.full.fields} onChange={action("change")} />
);

export default {title: "Tenant/Inputs/ExtraFields"};
