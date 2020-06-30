import React from "react";
import {Stack, Flex, Link as ChakraLink, Grid} from "@chakra-ui/core";

import SocialButton from "./SocialButton";
import Content from "./Content";

import TwitterIcon from "~/ui/icons/Twitter";
import FacebookIcon from "~/ui/icons/Facebook";
import InstagramIcon from "~/ui/icons/Instagram";
import WhatsappIcon from "~/ui/icons/WhatsApp";
import Link from "~/ui/controls/Link";
import {useTranslation} from "~/i18n/hooks";

const Footer: React.FC = () => {
  const t = useTranslation();

  return (
    <Flex alignItems="center" backgroundColor="teal.600" color="white" minHeight={20} paddingY={4}>
      <Content>
        <Grid
          gridGap={4}
          gridTemplateColumns={{
            base: "1fr",
            sm: "1fr auto",
          }}
        >
          <Stack isInline justifyContent="flex-start" spacing={2}>
            <Link isExternal href="https://twitter.com/Pencyapp">
              <SocialButton aria-label={t("app.landing.footerTwitter.title")} icon={TwitterIcon} />
            </Link>
            <Link isExternal href="https://www.facebook.com/pencyapp">
              <SocialButton
                aria-label={t("app.landing.footerFacebook.title")}
                icon={FacebookIcon}
              />
            </Link>
            <Link isExternal href="https://www.instagram.com/pencyapp">
              <SocialButton
                aria-label={t("app.landing.footerInstragram.title")}
                icon={InstagramIcon}
              />
            </Link>
            <Link isExternal href="https://wa.me/5491173694572">
              <SocialButton
                aria-label={t("app.landing.footerWhatsapp.title")}
                icon={WhatsappIcon}
              />
            </Link>
          </Stack>
          <Grid
            alignItems="center"
            gridGap={2}
            gridTemplateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
            }}
            textAlign={{base: "left", sm: "right"}}
          >
            <ChakraLink
              isExternal
              href="https://drive.google.com/file/d/1F99m25wjRq1QGDrE4Wpf3LmKavN6eg-3/view?usp=sharing"
            >
              {t("landing.footer.termsConditions")}
            </ChakraLink>
            <ChakraLink
              isExternal
              href="https://drive.google.com/file/d/1OWsa_Axqpj3ZtOvby_SbkT2ViCMoXwmx/view?usp=sharing"
            >
              {t("landing.footer.privacyPolicies")}
            </ChakraLink>
          </Grid>
        </Grid>
      </Content>
    </Flex>
  );
};

export default Footer;
