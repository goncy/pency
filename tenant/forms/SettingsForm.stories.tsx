import React from "react";
import {action} from "@storybook/addon-actions";
import {Stack, Button} from "@chakra-ui/core";

import mock from "../mock";

import SettingsForm from "./SettingsForm";

const settings = mock.client.full;

export const full = () => (
  <SettingsForm defaultValues={settings} onSubmit={action("submit")}>
    {({form, submit}) => (
      <Stack shouldWrapChildren spacing={4}>
        {form}
        <Button variantColor="primary" onClick={submit}>
          Submit
        </Button>
      </Stack>
    )}
  </SettingsForm>
);

export const empty = () => (
  <SettingsForm
    defaultValues={{
      title: settings.title,
      phone: settings.phone,
      color: settings.color,
      category: settings.category,
      country: settings.country,
      mercadopago: true,
      flags: ["mercadopago"],
    }}
    onSubmit={action("submit")}
  >
    {({form, submit}) => (
      <Stack shouldWrapChildren spacing={4}>
        {form}
        <Button variantColor="primary" onClick={submit}>
          Submit
        </Button>
      </Stack>
    )}
  </SettingsForm>
);

export default {title: "Tenant/Forms/SettingsForm"};
