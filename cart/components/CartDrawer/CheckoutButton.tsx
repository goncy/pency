import React from "react";

import Button from "~/ui/controls/Button";
import WhatsAppIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/hooks/translation";

const CheckoutButton = ({onClick}) => {
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
    >
      <WhatsAppIcon marginRight={2} />
      {t("cart.completeOnWhatsApp")}
    </Button>
  );
};

export default CheckoutButton;
