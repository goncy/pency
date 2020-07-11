import React from "react";
import {DrawerOverlay, Drawer as ChakraDrawer, IDrawer} from "@chakra-ui/core";
import {Global, css} from "@emotion/core";

import Content from "./Content";

interface Props extends Omit<IDrawer, "children"> {
  onAnimationEnd?: VoidFunction;
}

const Drawer: React.FC<Props> = ({children, onAnimationEnd, onClose, id, ...props}) => {
  function handleClose(event: React.MouseEvent | React.KeyboardEvent) {
    onClose(event);

    if (onAnimationEnd) {
      setTimeout(onAnimationEnd, 200);
    }
  }

  return (
    <>
      <Global
        styles={css`
          body {
            overflow: hidden;
          }

          #drawer-${id} {
            height: 100% !important;
          }
        `}
      />
      <ChakraDrawer
        isOpen
        preserveScrollBarGap
        id={id}
        placement="right"
        scrollBehavior="inside"
        size="md"
        onClose={handleClose}
        {...props}
      >
        <DrawerOverlay />
        <Content>{children}</Content>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
