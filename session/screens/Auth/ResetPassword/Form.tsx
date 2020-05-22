import React from "react";
import {Button, Stack, Text, FormErrorMessage, FormControl, Input, Box} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../../api";

import {useToast} from "~/hooks/toast";

interface FormData {
  email: string;
}

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<Props> = ({onBack, onSuccess}) => {
  const [status, setStatus] = React.useState("resolved");
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  function onSubmit({email}: FormData) {
    setStatus("pending");

    api
      .resetPassword(email)
      .then(onSuccess)
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error al reiniciar la contraseña, intentá de nuevo mas tarde",
          status: "error",
        });

        setStatus("rejected");
      });
  }

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack marginBottom={4} spacing={2}>
        <Text fontSize="xl" fontWeight={500}>
          Restablecé tu contraseña
        </Text>
        <Text color="gray.500">
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
            fontSize="md"
            name="email"
            placeholder="tumail@gmail.com"
            size="lg"
          />
          <FormErrorMessage>
            {(errors.email && errors.email.message) || "Este campo es requerido"}
          </FormErrorMessage>
        </FormControl>
        <Button
          fontSize="md"
          isLoading={status === "pending"}
          size="lg"
          type="submit"
          variantColor="primary"
        >
          Enviar instrucciones
        </Button>
        <Button
          _hover={{textDecoration: "none"}}
          fontSize="md"
          fontWeight={500}
          variant="link"
          variantColor="primary"
          onClick={onBack}
        >
          Volver
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;
