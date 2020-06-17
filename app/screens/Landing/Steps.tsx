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
      fontSize={{base: 24, sm: 36}}
      fontWeight={500}
      marginBottom={8}
      marginTop={2}
      maxWidth={{base: "auto", sm: 560}}
    >
      Comenzá ya mismo y en 5 minutos tené tu tienda funcionando
    </Text>
    <Grid gridGap={{base: 8, sm: 6}} templateColumns="repeat(auto-fit, minmax(320px,1fr))">
      <Feature icon={UserIcon} title="Crea tu cuenta">
        Solo necesitas un e-mail
      </Feature>
      <Feature icon={CustomizableIcon} title="Personalizá tu tienda">
        Que refleje tu estilo!
      </Feature>
      <Feature icon={SquareIcon} title="Agregá tus productos">
        Es fácil e intuitivo
      </Feature>
      <Feature icon={ShareIcon} title="Compartila!">
        A tus contactos y redes sociales
      </Feature>
    </Grid>
  </Content>
);

export default Steps;
