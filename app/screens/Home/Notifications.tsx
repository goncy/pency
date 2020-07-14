import React from "react";
import {Stack, Text} from "@chakra-ui/core";

const Notifications: React.FC = () => (
  <Stack backgroundColor="orange.400" borderRadius="sm" padding={4} spacing={2}>
    <Text color="white" fontSize="lg" fontWeight={500}>
      Atención
    </Text>
    <Text color="white">
      Estamos experimentando demoras de hasta 1 hora para reflejar en la tienda los cambios
      realizados en el panel de administración, estamos trabajando para poder solucionarlo y
      tendremos más información en los próximos días, disculpe los inconvenientes.
    </Text>
  </Stack>
);

export default Notifications;
