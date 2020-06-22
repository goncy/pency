import React from "react";
import {Text} from "@chakra-ui/core";

import Content from "./Content";

const Shout = () => (
  <Content
    paddingBottom={{base: 12, sm: 4}}
    paddingTop={{base: 12, sm: 20}}
    textAlign={{base: "left", sm: "center"}}
    width="100%"
  >
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
  </Content>
);

export default Shout;
