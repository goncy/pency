import React from "react";
import {DrawerOverlay, Drawer as ChakraDrawer, IDrawer} from "@chakra-ui/core";

import Content from "./Content";

interface Props extends IDrawer {
  onAnimationEnd?: VoidFunction;
}

const Drawer: React.FC<Props> = ({children, onAnimationEnd, onClose, ...props}) => {
  function handleClose(event: React.MouseEvent | React.KeyboardEvent) {
    onClose(event);

    if (onAnimationEnd) {
      setTimeout(onAnimationEnd, 200);
    }
  }

  return (
    <ChakraDrawer placement="right" size="md" onClose={handleClose} {...props}>
      <DrawerOverlay />
      <Content>{children}</Content>
    </ChakraDrawer>
  );
};

export default Drawer;
