import React from "react";
import {Stack, Text} from "@chakra-ui/core";

import Link from "~/ui/controls/Link";
import MailIcon from "~/ui/icons/Mail";
import WhatsappIcon from "~/ui/icons/WhatsApp";
import {useTranslation} from "~/i18n/hooks";

const Contact = () => {
  const t = useTranslation();

  return (
    <Stack spacing={2}>
      <Text fontSize="md" fontWeight="500">
        {t("admin.home.contact.title")}
      </Text>
      <Stack backgroundColor="gray.100" padding={4} rounded="md" spacing={6}>
        <Stack isInline alignItems="center" spacing={2}>
          <MailIcon width={6} />
          <Link
            isExternal
            fontWeight={500}
            href={`mailto:${process.env.MANTAINER_EMAIL}?subject=Consulta por la tienda`}
            lineHeight="normal"
          >
            {process.env.MANTAINER_EMAIL}
          </Link>
        </Stack>
        <Stack isInline alignItems="center" spacing={2}>
          <WhatsappIcon width={6} />
          <Link
            isExternal
            fontWeight={500}
            href={`https://wa.me/${process.env.MANTAINER_PHONE}`}
            lineHeight="normal"
          >
            {process.env.MANTAINER_PHONE}
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contact;
