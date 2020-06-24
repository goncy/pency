import React from "react";
import {Grid} from "@chakra-ui/core";

import Feature from "./Feature";
import Content from "./Content";
import PhoneClockIcon from "~/ui/icons/PhoneClock";
import MoneyShieldIcon from "~/ui/icons/MoneyShield";
import UsersChatIcon from "~/ui/icons/UsersChat";
import UserDistanceIcon from "~/ui/icons/UserDistance";

const Features = () => (
  <Content>
    <Grid
      as="section"
      gridColumnGap={{base: 8, sm: 10}}
      gridRowGap={{base: 8, sm: 12}}
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 20, sm: 32}}
      templateColumns="repeat(auto-fit, minmax(276px,1fr))"
    >
      <Feature icon={PhoneClockIcon} title="Agilizá la gestión de tu negocio">
        Optimizamos tus recursos simplificando la forma de recibir los pedidos.
      </Feature>
      <Feature icon={MoneyShieldIcon} title="Poné fin a las comisiones abusivas">
        Olvidate de los intermediarios y las comisiones por venta. Ofrecé un mejor precio con tu
        tienda independiente.
      </Feature>
      <Feature icon={UsersChatIcon} title="Hablá con tus clientes sin intermediarios">
        Brindá un mejor servicio y atención gracias a la comunicación directa.
      </Feature>
      <Feature icon={UserDistanceIcon} title="Evitá aglomeraciones en tu local">
        Reducí los tiempos de espera y librate de las filas innecesarias vendiendo online.
      </Feature>
    </Grid>
  </Content>
);


export default Features;
