import React from "react";
import {ModalOverlay, Modal as ChakraModal, IModal} from "@chakra-ui/core";
import {Global, css} from "@emotion/core";

import Content from "./Content";

interface Props extends Omit<IModal, "children"> {
  onAnimationEnd?: VoidFunction;
}

const Modal: React.FC<Props> = ({children, onAnimationEnd, onClose, id, ...props}) => {
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
        `}
      />
      <ChakraModal
        isOpen
        preserveScrollBarGap
        id={id}
        scrollBehavior="inside"
        size="md"
        onClose={handleClose}
        {...props}
      >
        <ModalOverlay zIndex={1400} />
        <Content>{children}</Content>
      </ChakraModal>
    </>
  );
};

export default Modal;
