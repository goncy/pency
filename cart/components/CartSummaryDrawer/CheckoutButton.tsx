import React from "react";
import {ButtonProps, Stack, Box, Text} from "@chakra-ui/core";

import Button from "~/ui/controls/Button";
import WhatsAppIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/i18n/hooks";

interface Props extends Omit<ButtonProps, "children"> {}

const CheckoutButton: React.FC<Props> = ({onClick, ...props}) => {
  const t = useTranslation();

  return (
    <Button
      backgroundColor="green.400"
      boxShadow="lg"
      color="white"
      size="lg"
      variantColor="green"
      width="100%"
      onClick={onClick}
      {...props}
    >
      <Stack isInline alignItems="center" spacing={2}>
        <WhatsAppIcon height={6} width={6} />
        <Text>{t("cart.completeOnWhatsApp")}</Text>
      </Stack>
    </Button>
  );
};

export default CheckoutButton;
