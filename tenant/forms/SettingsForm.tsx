import React from "react";
import {useForm, Controller} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Select,
  FormHelperText,
} from "@chakra-ui/core";

import {Tenant} from "../types";

import {COLORS} from "~/constants";
import ImageInput from "~/ui/inputs/Image";

interface Props {
  defaultValues?: Tenant;
  onSubmit: (values: Tenant) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const SettingsForm: React.FC<Props> = ({defaultValues = {}, children, onSubmit}) => {
  const {handleSubmit: submit, errors, register, control, formState} = useForm<Tenant>({
    defaultValues,
  });

  function handleSubmit(values: Tenant) {
    const tenant = {...defaultValues, ...values};

    return onSubmit(tenant);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={Boolean(errors.phone)}>
            <FormLabel htmlFor="phone">Teléfono</FormLabel>
            <Input
              ref={register({required: true, pattern: /^[0-9]+$/})}
              min={0}
              name="phone"
              placeholder="Teléfono"
              type="number"
            />
            <FormHelperText>
              Código país + código de area + teléfono. Ej: 549114444444
            </FormHelperText>
            <FormErrorMessage>
              {(errors.phone && errors.phone.message) || "Este campo es inválido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.color)}>
            <FormLabel htmlFor="color">Color</FormLabel>
            <Select ref={register({required: true})} name="color" placeholder="Color">
              {Object.entries(COLORS).map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {(errors.color && errors.color.message) || "Este campo es inválido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Título de la página</FormLabel>
            <Input ref={register} name="title" placeholder="Título de la página" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="keywords">Palabras clave</FormLabel>
            <Input ref={register} name="keywords" placeholder="Palabras clave" />
            <FormHelperText>Separadas por comas</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Descripción de la página</FormLabel>
            <Input ref={register} name="description" placeholder="Descripción de la página" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="logo">Logo</FormLabel>
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              format="png"
              name="logo"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="banner">Banner</FormLabel>
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              format="png"
              name="banner"
            />
            <FormHelperText>
              Se muestra al compartir el link por redes sociales (1200x630)
            </FormHelperText>
          </FormControl>
        </Stack>
      </form>
    ),
  });
};

export default SettingsForm;
