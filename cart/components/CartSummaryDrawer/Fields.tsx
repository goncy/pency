import React from "react";
import {Stack} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Field} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import CrossIcon from "~/ui/icons/Cross";

interface Props {
  fields: Field[];
  onSubmit: (fields: Field[]) => void;
  onClose: VoidFunction;
  onPrevious: VoidFunction;
}

const Fields: React.FC<Props> = ({fields, onSubmit, onClose, onPrevious}) => {
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
            <ArrowLeftIcon
              background="white"
              boxShadow="md"
              cursor="pointer"
              left={0}
              marginTop={4}
              paddingX={4}
              paddingY={3}
              position="absolute"
              roundedRight="lg"
              top={0}
              onClick={onPrevious}
            />
            <CrossIcon
              background="white"
              boxShadow="md"
              cursor="pointer"
              marginTop={4}
              paddingX={4}
              paddingY={3}
              position="absolute"
              right={0}
              roundedLeft="lg"
              top={0}
              onClick={onClose}
            />
            <Stack marginTop={20} spacing={6}>
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
