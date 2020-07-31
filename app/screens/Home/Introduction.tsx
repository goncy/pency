import React from "react";
import {Stack, Text} from "@chakra-ui/core";

import {ClientTenant} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";

interface Props {
  title: ClientTenant["title"];
}

const Introduction: React.FC<Props> = ({title}) => {
  const t = useTranslation();

  return (
    <Stack spacing={1}>
      <Text fontSize="xl" fontWeight="bold">
        {t("admin.home.introduction.title")} {title}
      </Text>
      <Text color="gray.500">{t("admin.home.introduction.blurb")}</Text>
    </Stack>
  );
};

export default Introduction;
