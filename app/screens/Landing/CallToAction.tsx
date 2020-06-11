import React from "react";
import {Stack, Button} from "@chakra-ui/core";

import Link from "~/ui/controls/Link";

const CallToAction = () => (
  <Stack
    isInline
    bottom={0}
    justifyContent="center"
    marginBottom={{base: 0, sm: 20}}
    paddingX={{base: 0, sm: 20}}
    position={{base: "sticky", sm: "relative"}}
    spacing={{base: 0, sm: 8}}
  >
    <Link
      isExternal
      flex={{base: 1, sm: "inherit"}}
      href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
    >
      <Button rounded={{base: "none", sm: "md"}} size="lg" variantColor="teal" width="100%">
        Crear tienda
      </Button>
    </Link>
    <Link isExternal flex={{base: 1, sm: "inherit"}} href="https://pency.app/demo">
      <Button
        backgroundColor="teal.50"
        rounded={{base: "none", sm: "md"}}
        size="lg"
        variant="ghost"
        variantColor="teal"
        width="100%"
      >
        Ver demo
      </Button>
    </Link>
  </Stack>
);

export default CallToAction;
