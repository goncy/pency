import * as yup from "yup";

import {ClientTenant, ServerTenant, Field, RadioField, TextField} from "./types";
import {DEFAULT_CLIENT_TENANT} from "./constants";

import productSchemas from "~/product/schemas";
import {Place} from "~/places/types";
import {Product} from "~/product/types";

const location = {
  schema: yup.object<Place>({
    address: yup.string().default(""),
    coordinates: yup.object({
      lat: yup.number().default(0),
      lng: yup.number().default(0),
    }),
  }),
  lazy: yup.lazy((value) =>
    value
      ? location.schema
      : yup
          .mixed()
          .transform(() => null)
          .oneOf([null]),
  ),
};
const mercadopago = {
  schema: yup.object<ServerTenant["mercadopago"]>({
    token: yup.string().default(""),
    refresh: yup.string().default(""),
    expiration: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .default(0),
  }),
  lazy: yup.lazy((value) =>
    value
      ? mercadopago.schema
      : yup
          .mixed()
          .transform(() => null)
          .oneOf([null]),
  ),
};
const field = {
  schema: {
    text: yup.object<TextField>({
      id: yup.string().required(),
      type: yup.string().oneOf(["text"]),
      title: yup.string().required(),
      note: yup.string().default(""),
      required: yup.boolean().required().default(false),
      value: yup.string(),
    }),
    radio: yup.object<RadioField>({
      id: yup.string().required(),
      type: yup.string().oneOf(["radio"]),
      title: yup.string().required(),
      options: yup.array(
        yup.object({
          id: yup.string().required(),
          title: yup.string().required(),
          note: yup.string().default(""),
        }),
      ),
      required: yup.boolean().required().default(false),
      value: yup.string(),
    }),
  },
  lazy: yup.lazy((value: Field) =>
    value.type === "radio" ? field.schema.radio : field.schema.text,
  ),
};
const color = yup
  .string()
  .oneOf<ServerTenant["color"]>([
    "teal",
    "green",
    "blue",
    "orange",
    "purple",
    "red",
    "gray",
    "cyan",
    "yellow",
    "pink",
  ]);
const flags = yup.array(yup.string());
const fields = yup.array<Field>(field.lazy);
const layout = yup.string().oneOf(["portrait", "landscape"]);
const products = {
  schema: yup.array().of(productSchemas.client.fetch),
  lazy: yup.lazy((value: Product[]) =>
    Array.isArray(value)
      ? products.schema
      : yup
          .mixed()
          .transform(() => null)
          .oneOf([null]),
  ),
};

export default {
  server: {
    fetch: yup.object<ServerTenant>({
      id: yup.string().required(),
      slug: yup.string().required(),
      createdAt: yup.number().nullable(),
      updatedAt: yup.number().nullable(),
      category: yup.string().nullable(),
      color: color.required(),
      phone: yup.string().required(),
      logo: yup.string().nullable(),
      title: yup.string().required(),
      instagram: yup.string().nullable(),
      facebook: yup.string().nullable(),
      twitter: yup.string().nullable(),
      keywords: yup.string().nullable(),
      banner: yup.string().nullable(),
      description: yup.string().nullable(),
      country: yup.string().nullable(),
      location: location.lazy,
      highlight: yup.string().nullable(),
      fields: fields.nullable(),
      flags: flags.nullable(),
      layout: layout.nullable(),
      hook: yup.string().nullable(),
      pixel: yup.string().nullable(),
      ga: yup.string().nullable(),
      mercadopago: mercadopago.lazy,
    }),
    update: yup.object<Partial<ServerTenant>>({
      id: yup.string().strip(true),
      slug: yup.string().strip(true),
      createdAt: yup.number().strip(true),
      updatedAt: yup.number().strip(true),
      category: yup.string().nullable(),
      color: color.nullable(),
      phone: yup.string().nullable(),
      logo: yup.string().nullable(),
      title: yup.string().nullable(),
      instagram: yup.string().nullable(),
      facebook: yup.string().nullable(),
      twitter: yup.string().nullable(),
      keywords: yup.string().nullable(),
      banner: yup.string().nullable(),
      description: yup.string().nullable(),
      country: yup.string().nullable(),
      location: location.lazy,
      highlight: yup.string().nullable(),
      fields: fields.nullable(),
      flags: flags.nullable(),
      layout: layout.nullable(),
      hook: yup.string().nullable(),
      pixel: yup.string().nullable(),
      ga: yup.string().nullable(),
      mercadopago: mercadopago.schema.nullable().strip(true),
    }),
    create: yup.object<ServerTenant>({
      id: yup.string().strip(true),
      slug: yup.string().required(),
      category: yup.string(),
      createdAt: yup.number().default(DEFAULT_CLIENT_TENANT.createdAt),
      updatedAt: yup.number().default(DEFAULT_CLIENT_TENANT.updatedAt),
      color: color.default(DEFAULT_CLIENT_TENANT.color),
      phone: yup.string().default(DEFAULT_CLIENT_TENANT.phone),
      logo: yup.string(),
      title: yup.string().default(DEFAULT_CLIENT_TENANT.title),
      instagram: yup.string(),
      facebook: yup.string(),
      twitter: yup.string(),
      keywords: yup.string().default(DEFAULT_CLIENT_TENANT.keywords),
      banner: yup.string(),
      description: yup.string().default(DEFAULT_CLIENT_TENANT.description),
      country: yup.string().default(DEFAULT_CLIENT_TENANT.country),
      location: location.schema.default(null),
      highlight: yup.string(),
      fields,
      layout: layout.default(DEFAULT_CLIENT_TENANT.layout),
      flags: flags.default(DEFAULT_CLIENT_TENANT.flags),
      hook: yup.string(),
      pixel: yup.string(),
      ga: yup.string(),
      mercadopago: mercadopago.schema.default(DEFAULT_CLIENT_TENANT.mercadopago),
    }),
    mercadopago: yup.object<Pick<ServerTenant, "mercadopago">>({
      mercadopago: mercadopago.lazy,
    }),
  },
  client: {
    fetch: yup.object<ClientTenant>({
      id: yup.string().required(),
      slug: yup.string().required(),
      category: yup.string().default("").nullable(),
      color: color.required(),
      createdAt: yup.number().default(DEFAULT_CLIENT_TENANT.createdAt),
      updatedAt: yup.number().default(DEFAULT_CLIENT_TENANT.updatedAt),
      phone: yup.string().required(),
      logo: yup.string().default("").nullable(),
      title: yup.string().default("").required(),
      instagram: yup.string().default("").nullable(),
      facebook: yup.string().default("").nullable(),
      twitter: yup.string().default("").nullable(),
      keywords: yup.string().default("").nullable(),
      banner: yup.string().default("").nullable(),
      description: yup.string().default("").nullable(),
      country: yup.string().default(DEFAULT_CLIENT_TENANT.country).nullable(),
      location: location.schema.default(null).nullable(),
      highlight: yup.string().default("").nullable(),
      layout: layout.default(DEFAULT_CLIENT_TENANT.layout).nullable(),
      fields: fields.default(DEFAULT_CLIENT_TENANT.fields).nullable(),
      flags: flags.default(DEFAULT_CLIENT_TENANT.flags).nullable(),
      hook: yup.string().default("").nullable(),
      pixel: yup.string().default("").nullable(),
      ga: yup.string().default("").nullable(),
      mercadopago: yup
        .boolean()
        .transform((mercadopago) => Boolean(mercadopago?.token))
        .default(false),
    }),
    update: yup.object<ClientTenant>({
      id: yup.string().strip(true),
      slug: yup.string().strip(true),
      createdAt: yup.number().strip(true),
      updatedAt: yup.number().strip(true),
      category: yup.string().nullable(),
      color: color.nullable(),
      phone: yup.string().nullable(),
      logo: yup.string().nullable(),
      title: yup.string().nullable(),
      instagram: yup.string().nullable(),
      facebook: yup.string().nullable(),
      twitter: yup.string().nullable(),
      keywords: yup.string().nullable(),
      banner: yup.string().nullable(),
      description: yup.string().nullable(),
      country: yup.string().nullable(),
      location: location.lazy,
      highlight: yup.string().nullable(),
      fields: fields.nullable(),
      flags: flags.nullable(),
      layout: layout.nullable(),
      hook: yup.string().nullable(),
      pixel: yup.string().nullable(),
      ga: yup.string().nullable(),
      mercadopago: yup.boolean().strip(true),
    }),
    create: yup.object<ClientTenant>({
      id: yup.string().strip(true),
      slug: yup.string().required(),
      category: yup.string(),
      createdAt: yup.number().default(DEFAULT_CLIENT_TENANT.createdAt),
      updatedAt: yup.number().default(DEFAULT_CLIENT_TENANT.updatedAt),
      color: color.default(DEFAULT_CLIENT_TENANT.color),
      phone: yup.string().default(DEFAULT_CLIENT_TENANT.phone),
      logo: yup.string(),
      title: yup.string().default(DEFAULT_CLIENT_TENANT.title),
      instagram: yup.string(),
      facebook: yup.string(),
      twitter: yup.string(),
      keywords: yup.string().default(DEFAULT_CLIENT_TENANT.keywords),
      banner: yup.string(),
      description: yup.string().default(DEFAULT_CLIENT_TENANT.description),
      country: yup.string().default(DEFAULT_CLIENT_TENANT.country),
      location: location.schema.default(null),
      highlight: yup.string(),
      fields,
      layout: layout.default(DEFAULT_CLIENT_TENANT.layout),
      flags: flags.default(DEFAULT_CLIENT_TENANT.flags),
      hook: yup.string(),
      pixel: yup.string(),
      ga: yup.string(),
      mercadopago: yup.boolean().default(DEFAULT_CLIENT_TENANT.mercadopago),
    }),
  },
};
