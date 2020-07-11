import React from "react";
import {BoxProps, DrawerFooter} from "@chakra-ui/core";

import {isIOSInstagramBrowser} from "~/app/selectors";

const Footer: React.FC<BoxProps> = (props) => {
  const isInstagramBrowser = isIOSInstagramBrowser();

  return (
    <DrawerFooter
      paddingBottom={isInstagramBrowser ? 16 : 4}
      paddingX={{base: 4, sm: 12}}
      {...props}
    />
  );
};

export default Footer;
