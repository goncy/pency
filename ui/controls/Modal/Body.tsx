import React from "react";
import {BoxProps, ModalBody} from "@chakra-ui/core";

import {isIOSInstagramBrowser} from "~/app/selectors";

const Body: React.FC<BoxProps> = (props) => {
  const isInstagramBrowser = isIOSInstagramBrowser();

  return (
    <ModalBody
      display="flex"
      flexDirection="column"
      marginTop={isInstagramBrowser ? 12 : 0}
      overflowY="auto"
      paddingY={0}
      position="relative"
      {...props}
    />
  );
};

export default Body;
