import React from "react";
import {Stack, Text} from "@chakra-ui/core";

const Notifications: React.FC = () => (
  <Stack backgroundColor="blue.400" borderRadius="sm" padding={4} spacing={2}>
    <Text color="white" fontSize="lg" fontWeight={500}>
      Información importante
    </Text>
    <Text color="white">
      Estamos experimentando cambios en el tiempo de actualización de la tienda, un mail fue enviado
      a cada tienda creada antes del 19/7/2020.
    </Text>
  </Stack>
);

export default Notifications;
