import React from "react";
import {Text, Stack, Button} from "@chakra-ui/core";

import Content from "./Content";

import Link from "~/ui/controls/Link";

const Shout = () => (
  <Content
    paddingBottom={{base: 12, sm: 4}}
    paddingTop={{base: 12, sm: 20}}
    textAlign={{base: "left", sm: "center"}}
    width="100%"
  >
    <Stack>
      <Text
        fontSize={{base: "3xl", md: "4xl", lg: "5xl", xl: "6xl"}}
        fontWeight={500}
        lineHeight={"130%"}
        marginBottom={{base: 4, sm: 6}}
        marginX="auto"
        maxWidth={{base: "auto", sm: "3xl", xl: "5xl"}}
      >
        Creá ahora tu tienda online y potenciá la gestión de tu negocio
      </Text>
      <Stack
        isInline
        display={{base: "none", sm: "flex"}}
        justifyContent="center"
        paddingBottom={20}
        paddingX={20}
        spacing={8}
      >
        <Link
          isExternal
          href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
        >
          <Button rounded="md" size="lg" variantColor="teal" width="100%">
            Crear tienda
          </Button>
        </Link>
        <Link isExternal href="https://pency.app/demo">
          <Button
            backgroundColor="teal.50"
            rounded="md"
            size="lg"
            variant="ghost"
            variantColor="teal"
            width="100%"
          >
            Ver tienda de prueba
          </Button>
        </Link>
      </Stack>
    </Stack>
  </Content>
);

export default Shout;
