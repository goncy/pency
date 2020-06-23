import React from "react";
import {Grid} from "@chakra-ui/core";

import Feature from "./Feature";
import Content from "./Content";

import ShoppingIcon from "~/ui/icons/Shopping";
import ClockIcon from "~/ui/icons/Clock";
import UsersIcon from "~/ui/icons/Users";
import {useTranslation} from "~/i18n/hooks";

const Features:React.FC = () => {
  const t = useTranslation();

  return (
    <Content>
      <Grid
        as="section"
        gridGap={{base: 8, sm: 6}}
        paddingBottom={{base: 12, sm: 20}}
        paddingTop={{base: 20, sm: 32}}
        templateColumns="repeat(auto-fit, minmax(320px,1fr))"
      >
        <Feature icon={ShoppingIcon} title={t("app.landing.keepCatalogUpdate.title")}>
          {t("app.landing.keepCatalogUpdate.description")}
        </Feature>
        <Feature icon={ClockIcon} title={t("app.landing.streamlineBusinessManagment.title")}>
          {t("app.landing.streamlineBusinessManagment.description")}
        </Feature>
        <Feature icon={UsersIcon} title={t("app.landing.reachManyCustomers.title")}>
          {t("app.landing.reachManyCustomers.description")}
        </Feature>
        <Feature icon={ShoppingIcon} title={t("app.landing.withoutIntermediaries.title")}>
          {t("app.landing.withoutIntermediaries.description")}
        </Feature>
      </Grid>
    </Content>
  )
};

export default Features;
