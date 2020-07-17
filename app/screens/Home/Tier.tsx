import React from "react";
import {Stack, Text, Badge} from "@chakra-ui/core";

import {ClientTenant} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";
import {getIsOnGracePeriod, getRemainingGracePeriod} from "~/tenant/selectors";

interface Props {
  createdAt: ClientTenant["createdAt"];
  tier: ClientTenant["tier"];
}

const COLORS = {
  free: "gray",
  entrepreneur: "teal",
  commercial: "green",
};

const Tier: React.FC<Props> = ({tier, createdAt}) => {
  const t = useTranslation();
  const isOnGracePeriod = getIsOnGracePeriod(createdAt);
  const remainingGracePeriod = getRemainingGracePeriod(createdAt);

  return (
    <Stack spacing={1}>
      <Stack isInline alignItems="baseline">
        <Text fontWeight={500}>Plan:</Text>
        {isOnGracePeriod ? (
          <Badge variantColor={COLORS["commercial"]}>{t(`tiers.commercial`)}</Badge>
        ) : (
          <Badge variantColor={COLORS[tier]}>{t(`tiers.${tier}`)}</Badge>
        )}
      </Stack>
      {isOnGracePeriod && (
        <Text color="gray.400" fontSize="sm">
          En {remainingGracePeriod} día(s) se volverá al plan {t(`tiers.${tier}`)}
        </Text>
      )}
    </Stack>
  );
};

export default Tier;
