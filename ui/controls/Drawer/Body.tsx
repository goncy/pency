import React from "react";
import {BoxProps, DrawerBody} from "@chakra-ui/core";

import {isIOSInstagramBrowser} from "~/app/selectors";

const Body: React.FC<BoxProps> = (props) => {
  const isInstagramBrowser = isIOSInstagramBrowser();

  return (
    <DrawerBody
      display="flex"
      flexDirection="column"
      marginTop={isInstagramBrowser ? 12 : 0}
      overflowY="auto"
      paddingX={{base: 4, sm: 12}}
      paddingY={0}
      position="relative"
      {...props}
    />
  );
};

export default Body;
