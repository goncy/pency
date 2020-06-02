import React from "react";
import {Stack} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";
import {CheckoutFields} from "../../types";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Tenant} from "~/tenant/types";
import {useTranslation} from "~/hooks/translation";

interface Props {
  fields: Tenant["fields"];
  onSubmit: (fields: CheckoutFields) => void;
}

const Fields: React.FC<Props> = ({fields, onSubmit}) => {
  const t = useTranslation();

  const defaultValues: CheckoutFields = fields.reduce(
    (values, field) => ({...values, [field.title]: ""}),
    {},
  );

  return (
    <FieldsForm defaultValues={defaultValues} fields={fields} onSubmit={onSubmit}>
      {({form, submit}) => (
        <>
          <DrawerBody overflowY="auto">
            <Stack spacing={6}>
              <DrawerTitle>{t("cart.completeOrder")}</DrawerTitle>
              {form}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Stack spacing={4} width="100%">
              <CheckoutButton
                onClick={(event) => {
                  event.stopPropagation();

                  submit();
                }}
              />
            </Stack>
          </DrawerFooter>
        </>
      )}
    </FieldsForm>
  );
};

export default Fields;
