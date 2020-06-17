import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../../mock";

import Fields from "./Fields";

export const empty = () => <Fields value={[]} onChange={action("change")} />;
export const full = () => <Fields value={mock.client.full.fields} onChange={action("change")} />;

export default {title: "Tenant/Inputs/Fields"};
