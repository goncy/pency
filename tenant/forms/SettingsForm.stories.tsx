import React from "react";

import tenantMock from "../mock";

import SettingsForm from "./SettingsForm";

export const full = () => (
  <SettingsForm defaultValues={tenantMock.full} onSubmit={() => {}}>
    {({form}) => form}
  </SettingsForm>
);

export default {title: "Tenant/Forms/SettingsForm"};
