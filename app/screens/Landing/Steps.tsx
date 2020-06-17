import React from "react";
import {Grid, Text} from "@chakra-ui/core";

import Feature from "./Feature";
import Content from "./Content";

import UserIcon from "~/ui/icons/User";
import CustomizableIcon from "~/ui/icons/Customizable";
import SquareIcon from "~/ui/icons/Square";
import ShareIcon from "~/ui/icons/Share";

const Steps = () => (
  <Content as="section" paddingY={{base: 12, sm: 20}}>
    <Text
      color="black"
      fontSize={["2xl", "3xl", "3xl", "4xl", "5xl"]}
      fontWeight={500}
      marginBottom={16}
      marginTop={2}
      maxWidth={{base: "auto", sm: "xl", lg:"2xl", xl:"3xl"}}
    >
      Abrí las puertas de tu negocio online en minutos
    </Text>
    <Grid gridGap={{base: 8, sm: 12}} templateColumns="repeat(auto-fit, minmax(276px,1fr))">
      <Feature icon={UserIcon} title="Entrá a la tienda y armá tu pedido">
      </Feature>
      <Feature icon={CustomizableIcon} title="Revisá y completá tu pedido">
      </Feature>
      <Feature icon={ShareIcon} title="Generamos tu pedido y te llevamos al WhatsApp de la tienda">
      </Feature>
    </Grid>
  </Content>
);

export default Steps;
