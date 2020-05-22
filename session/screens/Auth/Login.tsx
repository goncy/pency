import React from "react";
import {
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Flex,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../api";

import {useToast} from "~/hooks/toast";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import {Tenant} from "~/tenant/types";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  navigate: (route: string) => void;
  logo: Tenant["logo"];
  title: Tenant["title"];
}

const LoginScreen: React.FC<Props> = ({navigate, logo, title}) => {
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({email, password}: FormData) {
    setLoading(true);

    api.signIn(email, password).catch(() => {
      toast({
        title: "Error",
        description: "Hubo un error al iniciar sesión, verificá las credenciales",
        status: "error",
      });

      setLoading(false);
    });
  }

  return (
    <Flex alignItems="center" direction="column" width="100%">
      <TenantAvatar logo={logo} marginBottom={6} marginTop={{base: -12, sm: -16}} title={title} />
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel fontSize="sm" htmlFor="email">
              E-mail
            </FormLabel>
            <Input
              ref={register({required: true})}
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
          <FormControl isInvalid={Boolean(errors.password)}>
            <FormLabel
              display="flex"
              flex={1}
              htmlFor="password"
              justifyContent="space-between"
              paddingX={0}
            >
              <Text fontSize="sm">Contraseña</Text>
              <Button
                _hover={{textDecoration: "none"}}
                fontSize="sm"
                fontWeight={500}
                variant="link"
                variantColor="primary"
                onClick={() => navigate("reset")}
              >
                Recuperar contraseña
              </Button>
            </FormLabel>
            <Input
              ref={register({required: true})}
              focusBorderColor="primary.300"
              fontSize="md"
              name="password"
              placeholder="********"
              size="lg"
              type="password"
            />
            <FormErrorMessage>
              {(errors.password && errors.password.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <Button
            fontSize="md"
            isLoading={isLoading}
            size="lg"
            type="submit"
            variantColor="primary"
          >
            Ingresar
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
