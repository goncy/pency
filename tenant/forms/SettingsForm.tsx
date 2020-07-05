import React from "react";
import {useForm, Controller, FieldError} from "react-hook-form";
import {Stack, Text, Divider} from "@chakra-ui/core";

import {ClientTenant} from "../types";
import {CATEGORIES} from "../constants";
import FieldsInput, {validator as FieldsInputValidator} from "../inputs/Fields";
import LayoutInput from "../inputs/Layout";

import Select from "~/ui/inputs/Select";
import Input from "~/ui/inputs/Input";
import Textarea from "~/ui/inputs/Textarea";
import ColorRadio from "~/ui/inputs/ColorRadio";
import ImageInput from "~/ui/inputs/Image";
import FormControl from "~/ui/form/FormControl";
import MPConnect from "~/payment/inputs/MPConnect";
import PlaceInput from "~/ui/inputs/Place";
import {COUNTRIES} from "~/i18n/constants";
import {useTranslation} from "~/i18n/hooks";

interface Props {
  defaultValues: Partial<ClientTenant>;
  onSubmit: (values: ClientTenant) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const SettingsForm: React.FC<Props> = ({defaultValues = {}, children, onSubmit}) => {
  const {handleSubmit: submit, errors, register, control, formState} = useForm<ClientTenant>({
    defaultValues,
  });
  const t = useTranslation();

  function handleSubmit(values: ClientTenant) {
    const tenant = {...defaultValues, ...values};

    return onSubmit(tenant);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack spacing={8}>
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight={500} id="basic">
              Información básica
            </Text>
            <FormControl
              isRequired
              error={errors.phone && "Este campo es requerido y tiene un máximo de 70 caracteres"}
              help="Solo el nombre, sin slogan"
              label="Nombre de tu negocio"
              name="title"
            >
              <Input
                ref={register({required: true, maxLength: 70})}
                defaultValue=""
                maxLength={70}
                name="title"
                placeholder="Pastelerías Pency"
              />
            </FormControl>
            <FormControl
              error={errors.description && "Máximo 140 caracteres"}
              label="Descripción"
              name="description"
            >
              <Textarea
                ref={register({maxLength: 140})}
                defaultValue=""
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
                defaultValue=""
                maxLength={140}
                name="highlight"
                placeholder="Solo se despacharán pedidos hechos de lunes a viernes entre las 9 y las 18 horas"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.phone && (errors.phone.message || "Este campo es inválido")}
              help="Código país + código de area + teléfono. Ej: 5491173694572"
              isInvalid={Boolean(errors.phone)}
              label="WhatsApp"
              name="phone"
            >
              <Input
                ref={register({required: true, pattern: /^[0-9]+$/})}
                defaultValue=""
                min={0}
                name="phone"
                placeholder="5491144444444"
                type="number"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.category && "Este campo es requerido"}
              help="Ayudá a tus clientes a encontrar más rápido tus productos"
              label="Rubro al que pertenecés"
              name="category"
            >
              <Select
                ref={register({required: true})}
                defaultValue=""
                name="category"
                placeholder="Seleccioná un rubro"
              >
                {CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {t(`catalogs.categories.${value}`)}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl help="Separadas por comas" label="Palabras clave" name="keywords">
              <Input
                ref={register}
                defaultValue=""
                name="keywords"
                placeholder="delivery, pasteleria, cupcakes"
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.country && "Este campo es requerido"}
              help="Ayudá a tus clientes a encontrar más rápido tus productos"
              label="País"
              name="country"
            >
              <Select
                ref={register({required: true})}
                defaultValue=""
                name="country"
                placeholder="Seleccioná un país"
              >
                {Object.entries(COUNTRIES).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl
              help="Ayudá a tus clientes a encontrar tu local"
              label="Dirección"
              name="location"
            >
              <Controller
                as={PlaceInput}
                control={control}
                country={defaultValues.country}
                defaultValue={null}
                name="location"
                placeholder="Av. Eduardo Madero 470"
              />
            </FormControl>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Text fontSize="2xl" fontWeight={500} id="customization">
                Personalización
              </Text>
              <Text color="gray.600">Dale a tu tienda tu estilo</Text>
            </Stack>
            <FormControl label="Logo" name="logo">
              <Controller
                as={ImageInput}
                control={control}
                defaultValue=""
                name="logo"
                quality="low"
              />
            </FormControl>
            <FormControl
              help="Tamaño recomendado 1200 x 630"
              label="Imágen de cabecera"
              name="banner"
            >
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
            <FormControl
              isRequired
              error={errors.color && "Este campo es inválido"}
              label="Color principal"
            >
              <Controller
                as={ColorRadio}
                control={control}
                defaultValue="teal"
                name="color"
                rules={{required: true}}
              />
            </FormControl>
            <FormControl
              isRequired
              error={errors.layout && "Este campo es requerido"}
              help="El diseño horizontal es recomendado cuando tenés muchos productos"
              label="Diseño"
              name="layout"
            >
              <Controller
                as={LayoutInput}
                control={control}
                defaultValue="portrait"
                name="layout"
              />
            </FormControl>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight={500} id="social">
              Redes sociales
            </Text>
            <FormControl
              error={errors.instagram?.message}
              label="Usuario de Instagram"
              name="instagram"
            >
              <Input
                ref={register({
                  validate: (value) =>
                    value.includes("instagram.com")
                      ? "Solo el usuario, no el link completo"
                      : value.includes("@")
                      ? "No debe contener el arroba, solo el usuario"
                      : true,
                })}
                defaultValue=""
                name="instagram"
                placeholder="pencyapp"
              />
            </FormControl>
            <FormControl
              error={errors.facebook?.message}
              label="Página de Facebook"
              name="facebook"
            >
              <Input
                ref={register({
                  validate: (value) =>
                    value.includes("facebook.com") ? "Solo el usuario, no el link completo" : true,
                })}
                defaultValue=""
                name="facebook"
                placeholder="pencyapp"
              />
            </FormControl>
            <FormControl error={errors.twitter?.message} label="Usuario de Twitter" name="twitter">
              <Input
                ref={register({
                  validate: (value) =>
                    value.includes("twitter.com")
                      ? "Solo el usuario, no el link completo"
                      : value.includes("@")
                      ? "No debe contener el arroba, solo el usuario"
                      : true,
                })}
                defaultValue=""
                name="twitter"
                placeholder="pencyapp"
              />
            </FormControl>
          </Stack>
          <Divider />
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Text fontSize="2xl" fontWeight={500} id="fields">
                Campos adicionales
              </Text>
              <Text color="gray.600">
                Solicitale a tus clientes más información antes de realizar el pedido. Por ejemplo:
                Forma de pago.
              </Text>
            </Stack>
            <FormControl name="fields">
              <Controller
                as={FieldsInput}
                control={control}
                defaultValue={[]}
                error={(errors.fields as unknown) as FieldError}
                name="fields"
                rules={{validate: FieldsInputValidator}}
              />
            </FormControl>
          </Stack>
          {defaultValues.flags?.includes("mercadopago") && (
            <>
              <Divider />
              <Stack marginY={8} spacing={4}>
                <Stack spacing={1}>
                  <Text fontSize="2xl" fontWeight={500} id="mercadopago">
                    Mercado Pago
                  </Text>
                  <Text color="gray.600">
                    Tenes la opción de conectar a Mercado Pago a tu tienda. Esto permitirá que le
                    generemos un link de pago a tus clientes luego e que hayan hecho su pedido.
                  </Text>
                </Stack>
                <FormControl name="mercadopago">
                  <Controller
                    as={MPConnect}
                    control={control}
                    defaultChecked={false}
                    id={defaultValues.id}
                    name="mercadopago"
                    slug={defaultValues.slug}
                  />
                </FormControl>
              </Stack>
            </>
          )}
          {defaultValues.flags?.includes("advanced") && (
            <>
              <Divider />
              <Stack marginTop={8} spacing={4}>
                <Stack spacing={1}>
                  <Text fontSize="2xl" fontWeight={500} id="advanced">
                    Opciones avanzadas
                  </Text>
                  <Text color="gray.600">
                    Conectá tu servicio de facturación o aplicación con Pency mediante webhooks o
                    más
                  </Text>
                </Stack>
                <FormControl help="Vamos a hacer un POST a esta url" name="hook">
                  <Input
                    ref={register({required: true})}
                    defaultValue=""
                    name="hook"
                    placeholder="https://tuwebhook.com"
                  />
                </FormControl>
              </Stack>
            </>
          )}
        </Stack>
      </form>
    ),
  });
};

export default SettingsForm;
