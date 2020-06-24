import React from "react";
import {Grid} from "@chakra-ui/core";

import Feature from "./Feature";
import Content from "./Content";

import PhoneClockIcon from "~/ui/icons/PhoneClock";
import MoneyShieldIcon from "~/ui/icons/MoneyShield";
import UsersChatIcon from "~/ui/icons/UsersChat";
import UserDistanceIcon from "~/ui/icons/UserDistance";
import {useTranslation} from "~/i18n/hooks";

const Features: React.FC = () => {
  const t = useTranslation();

  return (
    <Content>
      <Grid
        as="section"
        gridColumnGap={{base: 8, sm: 10}}
        gridRowGap={{base: 8, sm: 12}}
        paddingBottom={{base: 12, sm: 20}}
        paddingTop={{base: 20, sm: 32}}
        templateColumns="repeat(auto-fit, minmax(276px,1fr))"
      >
        <Feature icon={PhoneClockIcon} title={t("app.landing.streamlineBusinessManagment.title")}>
          {t("app.landing.streamlineBusinessManagment.description")}
        </Feature>
        <Feature icon={MoneyShieldIcon} title={t("app.landing.endAbusiveCommissions.title")}>
          {t("app.landing.endAbusiveCommissions.description")}
        </Feature>
        <Feature
          icon={UsersChatIcon}
          title={t("app.landing.talkClientWithoutIntermediaries.title")}
        >
          {t("app.landing.talkClientWithoutIntermediaries.description")}
        </Feature>
        <Feature icon={UserDistanceIcon} title={t("app.landing.avoidCrowdsPremises.title")}>
          {t("app.landing.avoidCrowdsPremises.description")}
        </Feature>
      </Grid>
    </Content>
  );
};

export default Features;
