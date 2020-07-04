import React from "react";
import {Stack, Button} from "@chakra-ui/core";

import Link from "~/ui/controls/Link";

const CallToAction = () => (
  <Stack
    isInline
    bottom={0}
    display={{base: "flex", sm: "none"}}
    justifyContent="center"
    position="sticky"
    spacing={0}
    zIndex={3}
  >
    <Link
      isExternal
      flex={1}
      href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
    >
      <Button rounded="none" size="lg" variantColor="teal" width="100%">
        Crear tienda
      </Button>
    </Link>
    <Link isExternal flex={1} href="https://pency.app/demo">
      <Button
        backgroundColor="teal.50"
        rounded="none"
        size="lg"
        variant="ghost"
        variantColor="teal"
        width="100%"
      >
        Ver tienda de prueba
      </Button>
    </Link>
  </Stack>
);

export default CallToAction;
