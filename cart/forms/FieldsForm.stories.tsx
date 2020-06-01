import React from "react";
import {action} from "@storybook/addon-actions";
import {Button, Stack} from "@chakra-ui/core";

import FieldsForm from "./FieldsForm";

import tenantMock from "~/tenant/mock";

export const full = () => (
  <FieldsForm fields={tenantMock.full.fields} onSubmit={action("submit")}>
    {({form, submit}) => (
      <Stack>
        {form}
        <Button onClick={submit}>Submit</Button>
      </Stack>
    )}
  </FieldsForm>
);

export default {title: "Cart/Forms/FieldsForm"};
