import React from "react";
import {BoxProps, ModalHeader, Stack, IModal, ModalCloseButton} from "@chakra-ui/core";

interface Props extends BoxProps {
  onClose?: IModal["onClose"];
}

const Header: React.FC<Props> = ({onClose, children, ...props}) => (
  <ModalHeader padding={4} {...props}>
    <Stack isInline alignItems="center" spacing={2}>
      {children}
      {onClose && (
        <ModalCloseButton
          cursor="pointer"
          marginLeft="auto"
          position="relative"
          right={0}
          size="lg"
          top={0}
          onClick={onClose}
        />
      )}
    </Stack>
  </ModalHeader>
);

export default Header;
