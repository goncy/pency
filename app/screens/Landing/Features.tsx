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
        <Feature
          icon={PhoneClockIcon}
          title={t("landing.features.streamlineBusinessManagment.title")}
        >
          {t("landing.features.streamlineBusinessManagment.description")}
        </Feature>
        <Feature icon={MoneyShieldIcon} title={t("landing.features.endAbusiveCommissions.title")}>
          {t("landing.features.endAbusiveCommissions.description")}
        </Feature>
        <Feature
          icon={UsersChatIcon}
          title={t("landing.features.talkClientWithoutIntermediaries.title")}
        >
          {t("landing.features.talkClientWithoutIntermediaries.description")}
        </Feature>
        <Feature icon={UserDistanceIcon} title={t("landing.features.avoidCrowdsPremises.title")}>
          {t("landing.features.avoidCrowdsPremises.description")}
        </Feature>
      </Grid>
    </Content>
  );
};

export default Features;
