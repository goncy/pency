import React from "react";
import {ModalContentProps, DrawerContent} from "@chakra-ui/core";

const Content: React.FC<ModalContentProps> = (props) => <DrawerContent padding={0} {...props} />;

export default Content;
