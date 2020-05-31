import React from "react";
import {DrawerContent, DrawerBody, DrawerFooter, Stack, Divider} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";
import {Field} from "../../types";

import CheckoutButton from "./CheckoutButton";
import Header from "./Header";

import {Tenant} from "~/tenant/types";

interface Props {
  fields: Tenant["fields"];
  onSubmit: (fields: Field) => void;
  onBack: VoidFunction;
}

const Fields: React.FC<Props> = ({fields, onSubmit, onBack}) => {
  const defaultValues: Field = fields.reduce(
    (values, field) => ({...values, [field.title]: ""}),
    {},
  );

  return (
    <DrawerContent>
      <Header onBack={onBack}>Completá tu pedido</Header>
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
