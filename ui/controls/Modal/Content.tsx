import React from "react";
import {ModalContentProps, ModalContent} from "@chakra-ui/core";

const Content: React.FC<ModalContentProps> = (props) => (
  <ModalContent padding={0} rounded="md" {...props} />
);

export default Content;
