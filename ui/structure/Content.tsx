import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const Content: React.FC<BoxProps> = ({children, ...props}) => (
  <Box margin="auto" maxWidth={{base: "100%", xl: "6xl"}} width="100%" {...props}>
    {children}
  </Box>
);

export default Content;
