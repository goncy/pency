import React from "react";
import {Stack} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Field} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";

interface Props {
  fields: Field[];
  onSubmit: (fields: Field[]) => void;
}

const Fields: React.FC<Props> = ({fields, onSubmit}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const t = useTranslation();

  function handleSubmit(event: React.MouseEvent, submit: () => Promise<void>) {
    event.stopPropagation();

    toggleLoading(true);

    submit().finally(() => toggleLoading(false));
  }

  return (
    <FieldsForm defaultValues={fields} onSubmit={onSubmit}>
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
                isLoading={isLoading}
                onClick={(event) => handleSubmit(event, submit)}
              />
            </Stack>
          </DrawerFooter>
        </>
      )}
    </FieldsForm>
  );
};

export default Fields;
