import React from "react";
import {
  Button,
  Flex,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import {Actions, Credentials} from "../types";

import TenantAvatar from "~/tenant/components/TenantAvatar";
import {Tenant} from "~/tenant/types";

interface Props {
  signIn: Actions["signIn"];
  title: Tenant["title"];
  logo: Tenant["logo"];
  isRestoring: boolean;
}

const LoginScreen: React.FC<Props> = ({signIn, isRestoring, title, logo}) => {
  const {handleSubmit, errors, register, formState} = useForm<Credentials>({});

  function onSubmit(values: Credentials) {
    return signIn(values.email, values.password);
  }

  return (
    <Flex
      alignItems="center"
      backgroundColor={{base: "white", sm: "gray.50"}}
      flex={1}
      flexDirection="column"
      justifyContent="center"
      padding={{base: 0, sm: 8}}
    >
      <Flex
        alignItems="center"
        backgroundColor="white"
        direction="column"
        minWidth={{base: "100%", sm: 400}}
        padding={8}
        rounded="lg"
        shadow={{base: "none", sm: "md"}}
      >
        <TenantAvatar logo={logo} marginBottom={6} marginTop={{base: -12, sm: -16}} title={title} />
        <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                ref={register({required: true})}
                autoFocus
                focusBorderColor="primary.300"
                name="email"
                placeholder="Email"
                size="lg"
              />
              <FormErrorMessage>
                {(errors.email && errors.email.message) || "Este campo es requerido"}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                ref={register({required: true})}
                focusBorderColor="primary.300"
                name="password"
                placeholder="Contraseña"
                size="lg"
                type="password"
              />
              <FormErrorMessage>
                {(errors.password && errors.password.message) || "Este campo es requerido"}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isRestoring || formState.isSubmitting}
              size="lg"
              type="submit"
              variantColor="primary"
            >
              Ingresar
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LoginScreen;
