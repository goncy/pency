import React from "react";
import {Flex, Text} from "@chakra-ui/core";

interface Props {
  error: string | number;
}

const Error: React.FC<Props> = ({error}) => (
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
      {Number(error) === 500
        ? "Estamos experimentando una sobrecarga en este momento, volvé mas tarde"
        : Number(error) === 404
        ? "Esta página no existe"
        : error}
    </Text>
  </Flex>
);

export default Error;
