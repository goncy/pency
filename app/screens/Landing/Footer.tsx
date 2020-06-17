import React from "react";
import {Stack, Box} from "@chakra-ui/core";

import SocialButton from "./SocialButton";
import Content from "./Content";

import TwitterIcon from "~/ui/icons/Twitter";
import FacebookIcon from "~/ui/icons/Facebook";
import InstagramIcon from "~/ui/icons/Instagram";
import WhatsappIcon from "~/ui/icons/WhatsApp";
import Link from "~/ui/controls/Link";

const Footer = () => (
  <Box backgroundColor="teal.600" color="white" height={20}>
    <Content height="100%">
      <Stack isInline alignItems="center" height="100%" justifyContent="flex-start" spacing={2}>
        <Link isExternal href="https://twitter.com/Pencyapp">
          <SocialButton aria-label="Seguinos en Twitter" icon={TwitterIcon} />
        </Link>
        <Link isExternal href="https://www.facebook.com/pencyapp">
          <SocialButton aria-label="Seguinos en Facebook" icon={FacebookIcon} />
        </Link>
        <Link isExternal href="https://www.instagram.com/pencyapp">
          <SocialButton aria-label="Seguinos en Instagram" icon={InstagramIcon} />
        </Link>
        <Link isExternal href="https://wa.me/5491173694572">
          <SocialButton aria-label="Seguinos en Whatsapp" icon={WhatsappIcon} />
        </Link>
      </Stack>
    </Content>
  </Box>
);

export default Footer;
