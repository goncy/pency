import React from "react";
import {BoxProps, ModalBody} from "@chakra-ui/core";

const Body: React.FC<BoxProps> = (props) => {
  return (
    <ModalBody
      display="flex"
      flexDirection="column"
      overflowY="auto"
      paddingY={0}
      position="relative"
      {...props}
    />
  );
};

export default Body;
