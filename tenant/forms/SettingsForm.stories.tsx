import React from "react";
import {action} from "@storybook/addon-actions";

import tenantMock from "../mock";

import SettingsForm from "./SettingsForm";

export const full = () => (
  <SettingsForm defaultValues={tenantMock.full} onSubmit={action("submit")}>
    {({form}) => form}
  </SettingsForm>
);

export default {title: "Tenant/Forms/SettingsForm"};
