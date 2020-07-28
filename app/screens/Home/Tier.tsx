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
  const remainingDays = dates.diffFromNow(expiration);

  return (
    <Stack spacing={1}>
      <Stack isInline alignItems="baseline">
        <Text fontWeight={500}>Plan:</Text>
        <Badge variantColor={COLORS[tier]}>{t(`tiers.${tier}.name`)}</Badge>
      </Stack>
      <Stack>
        <Text fontSize="sm">
          <b>Cambios reflejados en la tienda: </b>
          {t(`tiers.${tier}.features.update`)}
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
