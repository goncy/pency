import React from "react";
import {Flex, Text} from "@chakra-ui/core";

import {ERRORS} from "../constants";

interface Props {
  error: {
    status: Response["status"];
    text: Response["statusText"];
  };
}

const ErrorScreen: React.FC<Props> = ({error}) => (
  <Flex
    alignItems="center"
    backgroundColor="gray.100"
    color="white"
    height="100vh"
    justifyContent="center"
    overflow="hidden"
    padding={4}
    width="100vw"
  >
    <Text color="gray.500" fontSize="xl" textAlign="center">
      {ERRORS[Number(error.status)] || error.text}
    </Text>
  </Flex>
);

export default ErrorScreen;
