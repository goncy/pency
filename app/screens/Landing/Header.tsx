import React from "react";
import {Flex, Box, Button, Text, Image} from "@chakra-ui/core";

import Content from "./Content";

import Link from "~/ui/controls/Link";

const Header: React.FC = () => (
  <Flex alignItems="center" as="header" backgroundColor="teal.600" color="white" paddingY={8}>
    <Content alignItems="center" display="flex" flexDirection={{base: "column", md: "row"}}>
      <Box maxWidth={{base: "auto", sm: 480}}>
        <Text as="h2" fontSize={{base: 24, sm: 48}} fontWeight={500} lineHeight={"130%"} mb={2}>
          Ahorrá tiempo y dinero con tu tienda Pency
        </Text>
        <Text as="h3" color="teal.50" fontSize={{base: 20, sm: 24}}>
          Publicá tu catálogo online y recibí los pedidos por WhatsApp GRATIS.
        </Text>
        <Box display={{base: "none", sm: "block"}} marginTop={10}>
          <Link
            isExternal
            href="https://docs.google.com/forms/d/1P1o0HVHDluk-VMHHRLFVPn_TDKkqg_JhlMBmclcd6Co"
          >
            <Button backgroundColor="white" color="black" size="lg">
              Crear tienda
            </Button>
          </Link>
          <Link isExternal href="https://pency.app/demo">
            <Button
              _hover={{color: "black", backgroundColor: "white"}}
              color="white"
              marginLeft={{base: 0, sm: 6}}
              size="lg"
              variant="outline"
            >
              Ver tienda de prueba
            </Button>
          </Link>
        </Box>
      </Box>
      <Flex
        alignItems="center"
        flex={1}
        justifyContent={{base: "center", sm: "center", md: "flex-end"}}
        marginRight={{base: -4, sm: 0}}
        marginTop={{base: 10, sm: 0}}
      >
        <Image
          marginBottom={{base: -20, sm: -24}}
          maxWidth="80vw"
          paddingTop={{base: 2, sm: 0}}
          src="/assets/landing/phone.png"
        />
      </Flex>
    </Content>
  </Flex>
);

export default Header;
