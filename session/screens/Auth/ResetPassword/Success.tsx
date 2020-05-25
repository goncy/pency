import React from "react";
import {Stack, Link, Text} from "@chakra-ui/core";

const ResetPasswordSuccess: React.FC = () => {
  return (
    <Stack spacing={3} width="100%">
      <Text fontSize="xl" fontWeight={500}>
        Listo! Te enviamos las instrucciones
      </Text>
      <Text color="gray.500">
        Te llegará un mail que tiene un link para restablecer tu contraseña. Si no aparece en
        algunos minutos, revisa la carpeta spam.
      </Text>
      <Text color="gray.500">
        <span>En caso que tengas algún problema en el proceso escribimos a </span>
        <Link
          color="primary.500"
          href={`mailto:${process.env.MANTAINER_EMAIL}?subject=Consulta por Pency`}
        >
          {process.env.MANTAINER_EMAIL}
        </Link>
        .
      </Text>
    </Stack>
  );
};

export default ResetPasswordSuccess;
