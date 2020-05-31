import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Stack, Textarea, Text} from "@chakra-ui/core";

import {Tenant} from "../types";
import {CATEGORIES} from "../constants";
import ExtraFieldsInput, {validator as ExtraFieldsInputValidator} from "../inputs/ExtraFields";

import Select from "~/ui/inputs/Select";
import Input from "~/ui/inputs/Input";
import ColorRadio from "~/ui/inputs/ColorRadio";
import ImageInput from "~/ui/inputs/Image";
import FormControl from "~/ui/controls/FormControl";

interface Props {
  defaultValues: Partial<Tenant>;
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
          <FormControl
            isRequired
            error={errors.phone && (errors.phone.message || "Este campo es inválido")}
            help="Código país + código de area + teléfono. Ej: 549114444444"
            isInvalid={Boolean(errors.phone)}
            label="WhatsApp"
            name="phone"
          >
            <Input
              ref={register({required: true, pattern: /^[0-9]+$/})}
              min={0}
              name="phone"
              placeholder="5491144444444"
              type="number"
            />
          </FormControl>
          <FormControl
            isRequired
            error={errors.color && "Este campo es inválido"}
            isInvalid={Boolean(errors.color)}
            label="Color principal"
          >
            <Controller as={ColorRadio} control={control} name="color" rules={{required: true}} />
          </FormControl>
          <FormControl label="Nombre de tu negocio" name="title">
            <Input ref={register} name="title" placeholder="Pastelerías Pency" />
          </FormControl>
          <FormControl
            error={errors.description && "Máximo 140 caracteres"}
            label="Descripción"
            name="description"
          >
            <Textarea
              ref={register({maxLength: 140})}
              maxLength={140}
              name="description"
              placeholder="Somos una tienda de venta de pastelería, pedidos de lunes a viernes de 9 a 18"
            />
          </FormControl>
          <FormControl
            error={errors.highlight && "Máximo 140 caracteres"}
            help="Mostrado debajo de la descripción"
            label="Mensaje destacado"
            name="highlight"
          >
            <Input
              ref={register({maxLength: 140})}
              maxLength={140}
              name="highlight"
              placeholder="Solo se despacharán pedidos hechos de lunes a viernes entre las 9 y las 18 horas"
            />
          </FormControl>
          <FormControl label="Rubro al que pertenecés" name="category">
            <Select ref={register} name="category" placeholder="Seleccioná un rubro">
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="Otro">Otro</option>
            </Select>
          </FormControl>
          <FormControl help="Separadas por comas" label="Palabras clave" name="keywords">
            <Input ref={register} name="keywords" placeholder="delivery, pasteleria, cupcakes" />
          </FormControl>
          <FormControl
            error={errors?.instagram?.message}
            label="Usuario de Instagram"
            name="instagram"
          >
            <Input
              ref={register({
                validate: (value) =>
                  value.includes("instagram.com") ? "Solo el usuario, no el link completo" : true,
              })}
              name="instagram"
              placeholder="pencyapp"
            />
          </FormControl>
          <FormControl error={errors?.facebook?.message} label="Página de Facebook" name="facebook">
            <Input
              ref={register({
                validate: (value) =>
                  value.includes("facebook.com") ? "Solo el usuario, no el link completo" : true,
              })}
              name="facebook"
              placeholder="pencyapp"
            />
          </FormControl>
          <FormControl error={errors?.twitter?.message} label="Usuario de Twitter" name="twitter">
            <Input
              ref={register({
                validate: (value) =>
                  value.includes("twitter.com") ? "Solo el usuario, no el link completo" : true,
              })}
              name="twitter"
              placeholder="pencyapp"
            />
          </FormControl>
          <FormControl label="Logo" name="logo">
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              name="logo"
              quality="low"
            />
          </FormControl>
          <FormControl label="Foto de encabezado" name="banner">
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              height={32}
              name="banner"
              quality="high"
              width={64}
            />
          </FormControl>
          <Stack shouldWrapChildren spacing={4}>
            <Text fontSize="2xl" fontWeight={500}>
              Checkout
            </Text>
            <FormControl name="fields">
              <Controller
                as={ExtraFieldsInput}
                control={control}
                error={(errors.fields as any)?.type}
                name="fields"
                rules={{validate: ExtraFieldsInputValidator}}
              />
            </FormControl>
          </Stack>
        </Stack>
      </form>
    ),
  });
};

export default SettingsForm;
