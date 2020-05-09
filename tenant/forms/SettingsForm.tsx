import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Input, Stack, RadioGroup} from "@chakra-ui/core";

import {Tenant} from "../types";

import {COLORS} from "~/constants";
import ImageInput from "~/ui/inputs/Image";
import ColorRadio from "~/ui/inputs/ColorRadio";
import FormControl from "~/ui/controls/FormControl";
import TemplateInput from "~/cart/inputs/Template";
import {MOCK_CART} from "~/cart/constants";

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
          <FormControl
            isRequired
            error={(errors.phone && errors.phone.message) || "Este campo es inválido"}
            help="Código país + código de area + teléfono. Ej: 549114444444"
            isInvalid={Boolean(errors.phone)}
            label="Teléfono"
            name="phone"
          >
            <Input
              ref={register({required: true, pattern: /^[0-9]+$/})}
              min={0}
              name="phone"
              placeholder="Teléfono"
              type="number"
            />
          </FormControl>
          <FormControl
            isRequired
            error={(errors.color && errors.color.message) || "Este campo es inválido"}
            isInvalid={Boolean(errors.color)}
            label={"Color"}
          >
            <Controller
              as={
                <RadioGroup isInline>
                  {Object.entries(COLORS).map(([label, value]) => (
                    <ColorRadio key={label} color={value} name="color" value={value} />
                  ))}
                </RadioGroup>
              }
              control={control}
              name="color"
              rules={{required: true}}
            />
          </FormControl>
          <FormControl
            isRequired
            error={errors?.message?.message}
            help="Insertá {{productos}} y {{total}} donde quieras ponerlos"
            label="Mensaje"
            name="message"
          >
            <Controller
              as={TemplateInput}
              control={control}
              data={MOCK_CART}
              defaultValue=""
              name="message"
              rules={{
                validate: (value) =>
                  !value
                    ? "Este campo es requerido"
                    : value.includes("ERROR")
                    ? "Este campo es inválido"
                    : true,
              }}
            />
          </FormControl>
          <FormControl label="Título de la página" name="title">
            <Input ref={register} name="title" placeholder="Pastelerías Pency" />
          </FormControl>
          <FormControl help="Separadas por comas" label="Palabras clave" name="keywords">
            <Input ref={register} name="keywords" placeholder="delivery, pasteleria, cupcakes" />
          </FormControl>
          <FormControl label="Descripción" name="description">
            <Input
              ref={register}
              name="description"
              placeholder="Somos una tienda de venta de pastelería, pedidos de lunes a viernes de 9 a 18"
            />
          </FormControl>
          <FormControl label="Logo" name="logo">
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              format="png"
              name="logo"
            />
          </FormControl>
          <FormControl label="Foto de encabezado" name="banner">
            <Controller
              as={ImageInput}
              control={control}
              defaultValue=""
              format="png"
              name="banner"
            />
          </FormControl>
        </Stack>
      </form>
    ),
  });
};

export default SettingsForm;
