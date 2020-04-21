import React from "react";
import {
  Button,
  Flex,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import {Actions, Credentials} from "../types";

interface Props {
  signIn: Actions["signIn"];
  isRestoring: boolean;
}

const LoginScreen: React.FC<Props> = ({signIn, isRestoring}) => {
  const {handleSubmit, errors, register, formState} = useForm<Credentials>({});

  function onSubmit(values: Credentials) {
    return signIn(values.email, values.password);
  }

  return (
    <Flex alignItems="center" flex={1} justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={{base: 3, sm: 6}}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input ref={register({required: true})} name="email" placeholder="Email" />
            <FormErrorMessage>
              {(errors.email && errors.email.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              ref={register({required: true})}
              name="password"
              placeholder="Contraseña"
              type="password"
            />
            <FormErrorMessage>
              {(errors.password && errors.password.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isRestoring || formState.isSubmitting} type="submit">
            Iniciar sesión
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default LoginScreen;
