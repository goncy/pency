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
      gridGap={{base: 8, sm: 6}}
      paddingBottom={{base: 12, sm: 20}}
      paddingTop={{base: 20, sm: 32}}
      templateColumns="repeat(auto-fit, minmax(320px,1fr))"
    >
      <Feature icon={ShoppingIcon} title="Mantené tu catálogo actualizado">
        Cada cambio en tu carta o actualización de precios se refleja al instante.
      </Feature>
      <Feature icon={ClockIcon} title="Agilizá la gestión de tu negocio">
        Recibir pedidos por teléfono es lento, costoso y favorece errores, optimiza tiempo de tus
        empleados.
      </Feature>
      <Feature icon={UsersIcon} title="Alcanzá a muchos más clientes">
        Agregá, modificá o eliminar productos fácilmente.
      </Feature>
      <Feature icon={ShoppingIcon} title="Sin intermediarios">
        Los clientes son de tu negocio, no pagás comisiones por cada venta y ofreces un mejor
        precio.
      </Feature>
    </Grid>
  </Content>
);

export default Features;
