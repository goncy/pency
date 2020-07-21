import React from "react";
import {BoxProps, ModalFooter} from "@chakra-ui/core";

const Footer: React.FC<BoxProps> = (props) => {
  return <ModalFooter paddingBottom={4} {...props} />;
};

export default Footer;
