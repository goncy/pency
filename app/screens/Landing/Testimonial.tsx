import React from "react";
import {Stack, Avatar, Flex, Text} from "@chakra-ui/core";

import Content from "./Content";

import {useTranslation} from "~/i18n/hooks";

const Testimonial: React.FC = () => {
  const t = useTranslation();

  return (
    <Content as="section" marginTop={16}>
      <Stack
        alignItems="center"
        bg="gray.50"
        flexDirection="column"
        paddingX={4}
        paddingY={{base: 8, sm: 20}}
        rounded="lg"
        spacing={4}
        textAlign="center"
      >
        <Avatar
          name={t("landing.testimonial.userName")}
          size="2xl"
          src="/assets/landing/blondies.jpg"
        />
        <Text fontSize={{base: "2xl", sm: "3xl"}} maxWidth={{base: "auto", sm: 782}}>
          {t("landing.testimonial.message")}
        </Text>
        <Flex alignItems="center" flexDirection={{base: "column", sm: "row"}} fontSize={{base: 20}}>
          <Text color="teal.800" fontWeight={500} marginBottom={{base: 2, sm: 0}}>
            {t("landing.testimonial.userName")}
          </Text>
          <Text color="teal.500" display={{base: "none", sm: "block"}} marginX={2}>
            /
          </Text>
          <Text color="gray.500" fontSize={{base: 18, sm: 20}}>
            {t("landing.testimonial.ownerOf")}
          </Text>
        </Flex>
      </Stack>
    </Content>
  );
};

export default Testimonial;
