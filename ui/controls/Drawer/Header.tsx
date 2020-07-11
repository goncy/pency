import React from "react";
import {BoxProps, DrawerHeader, Flex, Stack, IDrawer, DrawerCloseButton} from "@chakra-ui/core";

import ArrowLeftIcon from "~/ui/icons/ArrowLeft";

interface Props extends BoxProps {
  onBack?: IDrawer["onClose"] | VoidFunction;
  onClose?: IDrawer["onClose"];
}

const Header: React.FC<Props> = ({onBack, onClose, ...props}) => (
  <DrawerHeader padding={4} {...props}>
    <Stack spacing={2}>
      {(onBack || onClose) && (
        <Flex alignItems="center">
          {onBack && <ArrowLeftIcon cursor="pointer" onClick={onBack} />}
          {onClose && (
            <DrawerCloseButton
              cursor="pointer"
              marginLeft="auto"
              position="relative"
              right={0}
              size="lg"
              top={0}
              onClick={onClose}
            />
          )}
        </Flex>
      )}
    </Stack>
  </DrawerHeader>
);

export default Header;
