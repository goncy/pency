import React from "react";
import {Grid, Button, Stack, Text} from "@chakra-ui/core";

import Content from "./Content";

import Link from "~/ui/controls/Link";
import Logo from "~/ui/static/Logo";
import WhatsappIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/i18n/hooks";

const Navbar: React.FC = () => {
  const t = useTranslation();

  return (
    <Content
      alignItems="center"
      as="nav"
      backgroundColor="white"
      display="flex"
      justifyContent="space-between"
      paddingY={{base: 4, sm: 5}}
    >
      <Logo />
      <Grid alignItems="center" gridAutoFlow="column" gridGap={{base: 4, sm: 8}}>
        <Link
          isExternal
          _hover={{color: "teal.700"}}
          color="gray.900"
          fontWeight={500}
          href={`https://wa.me/${process.env.MANTAINER_PHONE}`}
          transition="color 0.15s ease-out"
        >
          <Stack isInline>
            <WhatsappIcon width={6} />
            <Text>{t("landing.navBar.supportByWhatsapp")}</Text>
          </Stack>
        </Link>
        <Link
          isExternal
          href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
        >
          <Button d={{base: "none", sm: "block"}} variantColor="teal">
            {t("landing.navBar.createStore")}
          </Button>
        </Link>
      </Grid>
    </Content>
  );
};

export default Navbar;
