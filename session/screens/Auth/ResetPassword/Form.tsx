import React from "react";
import {Button, Stack, Text, FormErrorMessage, FormControl, Box} from "@chakra-ui/core";
import {useForm} from "react-hook-form";

import api from "../../../api";

import Input from "~/ui/inputs/Input";
import {useToast} from "~/hooks/toast";
import {useTranslation} from "~/hooks/translation";

interface FormData {
  email: string;
}

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<Props> = ({onBack, onSuccess}) => {
  const t = useTranslation();
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
          title: t("common.error"),
          description: t("auth.resetPasswordForm.resetError"),
          status: "error",
        });

        setStatus("rejected");
      });
  }

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack marginBottom={4} spacing={2}>
        <Text fontSize="xl" fontWeight={500}>
          {t("auth.resetPasswordForm.title")}
        </Text>
        <Text color="gray.500">{t("auth.resetPasswordForm.description")}</Text>
      </Stack>
      <Stack spacing={6}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <Input
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t("form.invalidEmail"),
              },
            })}
            autoFocus
            fontSize="md"
            name="email"
            placeholder="pency@gmail.com"
            size="lg"
          />
          <FormErrorMessage>
            {(errors.email && errors.email.message) || t("form.required")}
          </FormErrorMessage>
        </FormControl>
        <Button
          fontSize="md"
          isLoading={status === "pending"}
          size="lg"
          type="submit"
          variantColor="primary"
        >
          {t("auth.resetPasswordForm.sendInstructions")}
        </Button>
        <Button
          _hover={{textDecoration: "none"}}
          fontSize="md"
          fontWeight={500}
          variant="link"
          variantColor="primary"
          onClick={onBack}
        >
          {t("common.goBack")}
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPasswordForm;
