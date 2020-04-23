import React from "react";
import {Flex, Text} from "@chakra-ui/core";

const LandingScreen: React.FC = () => (
  <Flex
    alignItems="center"
    backgroundColor="cyan.500"
    color="white"
    height="100vh"
    justifyContent="center"
    overflow="hidden"
    padding={4}
    width="100vw"
  >
    <Text fontSize="xl" textAlign="center">
      Estamos en construcción, date una vuelta en unos días.
    </Text>
  </Flex>
);

export default LandingScreen;
