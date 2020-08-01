import React from "react";
import {Stack, Text, Box} from "@chakra-ui/core";

import QrCode from "~/ui/feedback/QrCode";
import {useTranslation} from "~/i18n/hooks";
import {ClientTenant} from "~/tenant/types";

interface Props {
  tenant: ClientTenant;
}

const Assets: React.FC<Props> = ({tenant}) => {
  const t = useTranslation();

  return (
    <Box>
      <Stack spacing={2}>
        <Stack spacing={0}>
          <Text fontSize="lg" fontWeight="bold">
            {t("admin.home.assets.title")}
          </Text>
          <Text color="gray.500">{t("admin.home.assets.footer")}</Text>
        </Stack>
        <QrCode
          borderColor="gray.300"
          borderWidth={1}
          text={`${process.env.APP_URL}/${tenant.slug}`}
        />
      </Stack>
    </Box>
  );
};

export default Assets;
