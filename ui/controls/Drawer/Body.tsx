import React from "react";
import {BoxProps, DrawerBody} from "@chakra-ui/core";

const Body: React.FC<BoxProps> = (props) => {
  return (
    <DrawerBody
      display="flex"
      flexDirection="column"
      overflowY="auto"
      paddingX={{base: 4, sm: 12}}
      paddingY={0}
      position="relative"
      {...props}
    />
  );
};

export default Body;
