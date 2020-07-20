import React from "react";
import {Text, BoxProps} from "@chakra-ui/core";

const Title: React.FC<BoxProps> = (props) => (
  <Text fontSize={{base: "xl", sm: "3xl"}} fontWeight={500} {...props} />
);

export default Title;
