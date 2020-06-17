import React from "react";
import {Stack, Link, Text} from "@chakra-ui/core";

import {useTranslation} from "~/i18n/hooks";

const ResetPasswordSuccess: React.FC = () => {
  const t = useTranslation();

  return (
    <Stack spacing={3} width="100%">
      <Text fontSize="xl" fontWeight={500}>
        {t("auth.resetPasswordSuccess.title")}
      </Text>
      <Text color="gray.500">{t("auth.resetPasswordSuccess.description")}</Text>
      <Text color="gray.500">
        <span>{t("auth.resetPasswordSuccess.contactUsAt")} </span>
        <Link
          color="primary.500"
          href={`mailto:${process.env.MANTAINER_EMAIL}?subject=${t(
            "auth.resetPasswordSuccess.emailTitle",
          )}`}
        >
          {process.env.MANTAINER_EMAIL}
        </Link>
        .
      </Text>
    </Stack>
  );
};

export default ResetPasswordSuccess;
