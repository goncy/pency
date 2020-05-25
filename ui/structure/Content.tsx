import React from "react";
import {Flex, FlexProps} from "@chakra-ui/core";

const Content: React.FC<FlexProps> = ({children, ...props}) => (
  <Flex margin="auto" maxWidth={{base: "100%", xl: "6xl"}} width="100%" {...props}>
    {children}
  </Flex>
);

export default Content;
