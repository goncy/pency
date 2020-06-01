import React from "react";
import {DrawerHeader, Stack, Text} from "@chakra-ui/core";

import ArrowLeftIcon from "~/ui/icons/ArrowLeft";

interface Props {
  onBack: VoidFunction;
}

const Header: React.FC<Props> = ({onBack, children}) => (
  <DrawerHeader padding={4}>
    <Stack>
      <ArrowLeftIcon cursor="pointer" onClick={onBack} />
      <Text fontWeight={500}>{children}</Text>
    </Stack>
  </DrawerHeader>
);

export default Header;
