import React from "react";
import {Stack, Button} from "@chakra-ui/core";

import Link from "~/ui/controls/Link";
import {useTranslation} from "~/i18n/hooks";

const CallToAction = () => {
  const t = useTranslation();

  return (
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
          {t("landing.callToAction.createStore")}
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
          {t("landing.callToAction.seeDemo")}
        </Button>
      </Link>
    </Stack>
  );
};

export default CallToAction;
