import React from "react";
import {action} from "@storybook/addon-actions";

import tenantMock from "../../mock";

import ExtraFields from "./ExtraFields";

export const empty = () => <ExtraFields value={[]} onChange={action("change")} />;
export const full = () => (
  <ExtraFields value={tenantMock.full.fields} onChange={action("change")} />
);

export default {title: "Tenant/Inputs/ExtraFields"};
