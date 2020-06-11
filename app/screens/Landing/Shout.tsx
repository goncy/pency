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
    <Text
      fontSize={["3xl", "3xl", "4xl", "5xl", "6xl"]}
      fontWeight={500}
      lineHeight={"130%"}
      marginBottom={{base: 4, sm: 6}}
      marginX="auto"
      maxWidth={{base: "auto", sm: "3xl", xl:"5xl"}}
      >
      Creá ahora tu tienda online y potenciá la gestión de tu negocio
    </Text>
  </Content>
);

export default Shout;
