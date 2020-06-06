import React from "react";
import {action} from "@storybook/addon-actions";

import mock from "../mock";

import SettingsForm from "./SettingsForm";

export const full = () => (
  <SettingsForm defaultValues={mock.client.full} onSubmit={action("submit")}>
    {({form}) => form}
  </SettingsForm>
);

export default {title: "Tenant/Forms/SettingsForm"};
