import React from "react";
import {Flex, Text} from "@chakra-ui/core";

interface Props {
  statusCode: number;
}

export const ERRORS = {
  304: "Algo no salió bien, este link no parece valido",
  404: "Esta tienda no existe",
  500: "Estamos teniendo un problema y lo estamos solucionando, volvé mas tarde",
};

const Error: React.FC<Props> = ({statusCode}) => {
  return (
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
        {ERRORS[Number(statusCode)] || "Hubo un error inesperado intentá de nuevo mas tarde"}
      </Text>
    </Flex>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}

export default Error;
