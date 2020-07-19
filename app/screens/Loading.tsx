import React from "react";
import {Flex, Spinner} from "@chakra-ui/core";

import {Theme} from "~/theme";

interface Props {
  color?: keyof Theme["colors"];
}

const LoadingScreen: React.FC<Props> = ({color = "teal"}) => (
  <Flex alignItems="center" height="100vh" justifyContent="center" width="100vw">
    <Spinner color={`${color}.500`} />
  </Flex>
);

export default LoadingScreen;
