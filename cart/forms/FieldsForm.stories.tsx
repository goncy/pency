import React from "react";
import {action} from "@storybook/addon-actions";
import {Stack} from "@chakra-ui/core";

import FieldsForm from "./FieldsForm";

import Button from "~/ui/controls/Button";
import tenantMock from "~/tenant/mock";

export const full = () => (
  <FieldsForm defaultValues={tenantMock.client.full.fields} onSubmit={action("submit")}>
    {({form, submit}) => (
      <Stack>
        {form}
        <Button marginTop={6} variantColor="primary" onClick={submit}>
          Submit
        </Button>
      </Stack>
    )}
  </FieldsForm>
);

export default {title: "Cart/Forms/FieldsForm"};
