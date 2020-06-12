import React from "react";
import {Grid} from "@chakra-ui/core";

import Feature from "./Feature";
import Content from "./Content";

import ShoppingIcon from "~/ui/icons/Shopping";
import ClockIcon from "~/ui/icons/Clock";
import UsersIcon from "~/ui/icons/Users";

const Features = () => (
  <Content>
    <Grid
      as="section"
      gridRowGap={{base: 8, sm: 12}}
      gridColumnGap={{base: 8, sm: 10}}
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 20, sm: 32}}
      templateColumns="repeat(auto-fit, minmax(276px,1fr))"
    >
      <Feature icon={ClockIcon} title="Agilizá la gestión de tu negocio">
        Optimizamos tus recursos simplificando la forma de recibir los pedidos.
      </Feature>
      <Feature icon={UsersIcon} title="Poné fin a las comisiones abusivas">
        Olvidate de los intermediarios y las comisiones por venta. Ofrecé un mejor precio con tu tienda independiente.
      </Feature>
      <Feature icon={ShoppingIcon} title="Hablá con tus clientes sin intermediarios">
        Brindá un mejor servicio y atención gracias a la comunicación directa.
      </Feature>
      <Feature icon={ShoppingIcon} title="Evitá aglomeraciones en tu local">
        Reducí los tiempos de espera y librate de las filas innecesarias vendiendo online.
      </Feature>
    </Grid>
  </Content>
);

export default Features;
