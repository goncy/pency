import React from "react";
import {ButtonProps} from "@chakra-ui/core";

import Button from "~/ui/controls/Button";
import WhatsAppIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/hooks/translation";

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
      <WhatsAppIcon marginRight={2} />
      {t("cart.completeOnWhatsApp")}
    </Button>
  );
};

export default CheckoutButton;
