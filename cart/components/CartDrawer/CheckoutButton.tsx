import React from "react";
import {Button} from "@chakra-ui/core";

import WhatsAppIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/hooks/translation";

const CheckoutButton = ({onClick}) => {
  const t = useTranslation();

  return (
    <Button
      backgroundColor="green.400"
      color="white"
      variantColor="green"
      w="100%"
      onClick={onClick}
    >
      <WhatsAppIcon marginRight={2} />
      {t("cart.complete")}
    </Button>
  );
};

export default CheckoutButton;
