import React from "react";
import {Stack, Text, Badge} from "@chakra-ui/core";

import {ClientTenant} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";

interface Props {
  tier: ClientTenant["tier"];
}

const COLORS = {
  free: "gray",
  enterpreneur: "teal",
  commercial: "green",
};

const Tier: React.FC<Props> = ({tier}) => {
  const t = useTranslation();

  return (
    <Stack isInline alignItems="baseline">
      <Text fontWeight={500}>Plan:</Text>
      <Badge variantColor={COLORS[tier]}>{t(`tiers.${tier}`)}</Badge>
    </Stack>
  );
};

export default Tier;
