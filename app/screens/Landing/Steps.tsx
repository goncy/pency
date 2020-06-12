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
      <Feature icon={UserIcon} title="Creá tu cuenta">
        Es gratis y rápido. Solo necesitás una dirección de correo electrónico.
      </Feature>
      <Feature icon={CustomizableIcon} title="Personalizá tu tienda">
        Configurala con las imágenes y colores que definan tu marca.
      </Feature>
      <Feature icon={SquareIcon} title="Agregá tus productos">
        Nuestro menú es intuitivo. Encontrá las opciones que se ajustan a tus productos.
      </Feature>
      <Feature icon={ShareIcon} title="Compartí tu tienda Pency ">
        Enviala a través de WhatsApp, mail, y añadila como sitio web en tus redes sociales.
      </Feature>
    </Grid>
  </Content>
);

export default Steps;
