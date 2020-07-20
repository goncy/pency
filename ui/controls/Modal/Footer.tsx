import React from "react";
import {BoxProps, ModalFooter} from "@chakra-ui/core";

import {isIOSInstagramBrowser} from "~/app/selectors";

const Footer: React.FC<BoxProps> = (props) => {
  const isInstagramBrowser = isIOSInstagramBrowser();

  return <ModalFooter paddingBottom={isInstagramBrowser ? 16 : 4} {...props} />;
};

export default Footer;
