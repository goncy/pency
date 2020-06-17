import React from "react";
import {
  Button,
  Stack,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Box,
  Text,
  Flex,
} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../api/client";

import Input from "~/ui/inputs/Input";
import {useToast} from "~/hooks/toast";
import TenantAvatar from "~/tenant/components/TenantAvatar";
import {ClientTenant} from "~/tenant/types";
import {useTranslation} from "~/i18n/hooks";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  navigate: (route: string) => void;
  logo: ClientTenant["logo"];
  title: ClientTenant["title"];
}

const LoginScreen: React.FC<Props> = ({navigate, logo, title}) => {
  const [isLoading, setLoading] = React.useState(false);
  const t = useTranslation();
  const toast = useToast();
  const {handleSubmit, errors, register} = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit({email, password}: FormData) {
    setLoading(true);

    api
      .signIn(email, password)
      .catch(() =>
        toast({
          title: t("common.error"),
          description: t("auth.login.signInError"),
          status: "error",
        }),
      )
      .then(() => setLoading(false));
  }

  return (
    <Flex alignItems="center" direction="column" width="100%">
      <TenantAvatar logo={logo} marginBottom={6} marginTop={{base: -12, sm: -16}} title={title} />
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel fontSize="sm" htmlFor="email">
              {t("common.email")}
            </FormLabel>
            <Input
              ref={register({required: true})}
              autoFocus
              fontSize="md"
              name="email"
              placeholder="pency@gmail.com"
              size="lg"
              tabIndex={1}
            />
            <FormErrorMessage>
              {(errors.email && errors.email.message) || t("form.required")}
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
              <Text fontSize="sm">{t("common.password")}</Text>
              <Button
                _hover={{textDecoration: "none"}}
                fontSize="sm"
                fontWeight={500}
                tabIndex={4}
                variant="link"
                variantColor="primary"
                onClick={() => navigate("reset")}
              >
                {t("auth.login.recoverPassword")}
              </Button>
            </FormLabel>
            <Input
              ref={register({required: true})}
              fontSize="md"
              name="password"
              placeholder="********"
              size="lg"
              tabIndex={2}
              type="password"
            />
            <FormErrorMessage>
              {(errors.password && errors.password.message) || t("form.required")}
            </FormErrorMessage>
          </FormControl>
          <Button
            fontSize="md"
            isLoading={isLoading}
            size="lg"
            tabIndex={3}
            type="submit"
            variantColor="primary"
          >
            {t("auth.login.signIn")}
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
