import React from "react";
import {Text} from "@chakra-ui/core";

import Content from "./Content";

const Shout = () => (
  <Content
    borderTopWidth={1}
    paddingY={{base: 12, sm: 20}}
    textAlign={{base: "left", sm: "center"}}
  >
    <Text fontSize={{base: 24, sm: 48}} fontWeight={500} marginBottom={{base: 4, sm: 6}}>
      Empezá una gestión rápida y profesional de tu negocio
    </Text>
    <Text color="gray.500" fontSize={{base: 18, sm: 24}}>
      Estás a un paso de llevar tu negocio a otro nivel.
    </Text>
  </Content>
);

export default Shout;
