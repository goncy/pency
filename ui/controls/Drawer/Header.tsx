import React from "react";
import {BoxProps, DrawerHeader, Flex, Stack, IDrawer} from "@chakra-ui/core";

import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import CrossIcon from "~/ui/icons/Cross";

interface Props extends BoxProps {
  onBack?: IDrawer["onClose"] | VoidFunction;
  onClose?: IDrawer["onClose"];
}

const Header: React.FC<Props> = ({onBack, onClose, ...props}) => (
  <DrawerHeader padding={4} {...props}>
    <Stack spacing={2}>
      {(onBack || onClose) && (
        <Flex>
          {onBack && <ArrowLeftIcon cursor="pointer" onClick={onBack} />}
          {onClose && <CrossIcon cursor="pointer" marginLeft="auto" onClick={onClose} />}
        </Flex>
      )}
    </Stack>
  </DrawerHeader>
);

export default Header;
