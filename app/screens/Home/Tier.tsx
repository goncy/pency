import React from "react";
import {Stack, Text, Badge} from "@chakra-ui/core";

import {ClientTenant} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";
import dates from "~/utils/date";

interface Props {
  tier: ClientTenant["tier"];
  expiration: ClientTenant["tierUntil"];
}

const COLORS = {
  free: "gray",
  preferential: "teal",
  commercial: "green",
};

const Tier: React.FC<Props> = ({tier, expiration}) => {
  const t = useTranslation();
  const remainingDays = dates.daysDiffFromNow(expiration);

  return (
    <Stack spacing={2}>
      <Stack isInline alignItems="baseline">
        <Text fontWeight={500}>Plan:</Text>
        <Badge variantColor={COLORS[tier]}>{t(`admin.home.tiers.${tier}.name`)}</Badge>
      </Stack>
      <Stack spacing={1}>
        <Text fontSize="sm">
          <b>Cambios reflejados en la tienda: </b>
          {t(`admin.home.tiers.${tier}.features.update`)}
        </Text>
        <Text fontSize="sm">
          <b>Cantidad máxima de productos: </b>
          {t(`admin.home.tiers.${tier}.features.products`)}
        </Text>
      </Stack>
      {remainingDays > 0 && (
        <Text color="gray.400" fontSize="sm">
          {remainingDays} día(s) restantes
        </Text>
      )}
    </Stack>
  );
};

export default Tier;
