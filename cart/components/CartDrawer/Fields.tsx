import React from "react";
import {
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Stack,
  Divider,
} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";
import {Field} from "../../types";

import CheckoutButton from "./CheckoutButton";

import {Tenant} from "~/tenant/types";

interface Props {
  fields: Tenant["fields"];
  onSubmit: (fields: Field) => void;
}

const Fields: React.FC<Props> = ({fields, onSubmit}) => {
  const defaultValues: Field = fields.reduce(
    (values, field) => ({...values, [field.title]: ""}),
    {},
  );

  return (
    <DrawerContent>
      <DrawerCloseButton right="8px" top="8px" />
      <DrawerHeader p={4}>Campos adicionales</DrawerHeader>
      <FieldsForm defaultValues={defaultValues} fields={fields} onSubmit={onSubmit}>
        {({form, submit}) => (
          <>
            <DrawerBody overflowY="auto" padding={4}>
              {form}
            </DrawerBody>
            <DrawerFooter padding={4}>
              <Stack spacing={4} width="100%">
                <Divider />
                <CheckoutButton onClick={submit} />
              </Stack>
            </DrawerFooter>
          </>
        )}
      </FieldsForm>
    </DrawerContent>
  );
};

export default Fields;
