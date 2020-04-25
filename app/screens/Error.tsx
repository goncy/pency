import React from "react";
import {Flex, Text} from "@chakra-ui/core";

interface Props {
  error: string;
}

const NotFoundScreen: React.FC<Props> = ({error}) => (
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
      {error}
    </Text>
  </Flex>
);

export default NotFoundScreen;
