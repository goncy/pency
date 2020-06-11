import React from "react";
import {Text} from "@chakra-ui/core";

import Content from "./Content";

const Shout = () => (
  <Content
    borderTopWidth={1}
    paddingY={{base: 12, sm: 20}}
    textAlign={{base: "left", sm: "center"}}
    width="100%"

  >
    <Text fontSize={{base: 24, sm: 48}} fontWeight={500} marginBottom={{base: 4, sm: 6}} marginX="auto" maxWidth={{base: "auto", sm: "3xl"}} >
      Creá ahora tu tienda online y potenciá la gestión de tu negocio
    </Text>
  </Content>
);

export default Shout;
