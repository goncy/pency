import React from "react";
import {Stack, Text, ButtonProps} from "@chakra-ui/core";

import Button from "../Button";

import WhatsAppIcon from "~/ui/icons/WhatsApp";

const WhatsAppButton: React.FC<ButtonProps> = ({children, ...props}) => (
  <Button
    backgroundColor="whatsapp.500"
    boxShadow="lg"
    color="white"
    size="lg"
    variantColor="green"
    width="100%"
    {...props}
  >
    <Stack isInline alignItems="center" spacing={2}>
      <WhatsAppIcon height={6} width={6} />
      <Text>{children}</Text>
    </Stack>
  </Button>
);

export default WhatsAppButton;
