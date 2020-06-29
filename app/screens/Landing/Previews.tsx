import React from "react";
import {Stack, Text, Box} from "@chakra-ui/core";

import Preview from "./Preview";
import Content from "./Content";

import {useTranslation} from "~/i18n/hooks";

const Previews: React.FC = () => {
  const t = useTranslation();

  return (
    <Box
      as="section"
      backgroundColor="teal.50"
      paddingBottom={{base: 12, sm: 24}}
      paddingTop={{base: 16, sm: 24}}
      textAlign={{base: "left", sm: "center"}}
    >
      <Content>
        <Stack spacing={12}>
          <Stack alignItems="center" spacing={2}>
            <Text
              as="h2"
              color="gray.900"
              fontSize={{base: "2xl", sm: "3xl", lg: "4xl", xl: "5xl"}}
              fontWeight={500}
              marginBottom={{base: 4, sm: 0}}
            >
              {t("landing.previews.versatileForAllBusinesses.title")}
            </Text>
            <Text
              as="h4"
              color="gray.500"
              fontSize={{base: 18, sm: 20}}
              maxWidth={{base: "auto", sm: "3xl"}}
              textAlign={{base: "left", sm: "center"}}
            >
              {t("landing.previews.versatileForAllBusinesses.description")}
            </Text>
          </Stack>
          <Stack
            isInline
            shouldWrapChildren
            alignItems="center"
            as="section"
            overflowX="auto"
            paddingY={8}
            spacing={12}
          >
            <Preview
              image="/assets/landing/tienda-fosforococina.jpg"
              store="fosforo.cocina"
              title="Fosforo Cocina"
            />
            <Preview
              image="/assets/landing/tienda-faithco.jpg"
              store="faithdecoarg"
              title="Faith"
            />
            <Preview
              image="/assets/landing/tienda-almacen.jpg"
              store="almacensaludableok"
              title="Almacen Saludable"
            />
            <Preview
              image="/assets/landing/tienda-brulee.jpg"
              store="brulee"
              title="Brulee Bakery"
            />
          </Stack>
        </Stack>
      </Content>
    </Box>
  );
};

export default Previews;
