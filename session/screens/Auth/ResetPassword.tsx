import React from "react";
import {Button, Stack, Text, FormErrorMessage, FormControl, Input, Box} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../api";

import {useToast} from "~/hooks/toast";

interface FormData {
  email: string;
}

interface Props {
  navigate: (route: string) => void;
}

const ResetPasswordScreen: React.FC<Props> = ({navigate}) => {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  function onSubmit({email}: FormData) {
    setLoading(true);

    api
      .resetPassword(email)
      .then(() => {
        toast({
          title: "Listo!",
          duration: 10000,
          description:
            "Te llegará un mail que tiene un link para restablecer tu contraseña. Si no aparece en algunos minutos, revisa la carpeta spam. En caso que tengas algún problema en el proceso escribimos a ayuda@pency.app",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error al reiniciar la contraseña, intentá de nuevo mas tarde",
          status: "error",
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Box as="form" maxWidth={420} width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack marginBottom={3} spacing={2}>
        <Text fontSize="xl" fontWeight={500}>
          Restablecé tu contraseña
        </Text>
        <Text color="gray.400">
          Ingresá tu mail y te enviaremos intrucciones sobre como restrablecerla.
        </Text>
      </Stack>
      <Stack spacing={6}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <Input
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "No es un email válido",
              },
            })}
            autoFocus
            focusBorderColor="primary.300"
            name="email"
            placeholder="tumail@gmail.com"
            size="lg"
          />
          <FormErrorMessage>
            {(errors.email && errors.email.message) || "Este campo es requerido"}
          </FormErrorMessage>
        </FormControl>
        <Button isLoading={isLoading} size="lg" type="submit" variantColor="primary">
          Enviar instrucciones
        </Button>
        <Button
          _hover={{textDecoration: "none"}}
          fontWeight={500}
          variant="link"
          variantColor="primary"
          onClick={() => navigate("login")}
        >
          Volver
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordScreen;
