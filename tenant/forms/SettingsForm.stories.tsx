import React from "react";
import {action} from "@storybook/addon-actions";
import {Stack, Button} from "@chakra-ui/core";

import mock from "../mock";

import SettingsForm from "./SettingsForm";

export const full = () => (
  <SettingsForm defaultValues={mock.client.full} onSubmit={action("submit")}>
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
