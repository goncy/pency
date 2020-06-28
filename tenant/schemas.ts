import * as yup from "yup";

import {ClientTenant, ServerTenant, Field} from "./types";

import {Place} from "~/places/types";

const location = {
  schema: yup.object<Place>({
    address: yup.string().default(""),
    coordinates: yup.object({
      lat: yup.number().default(0),
      lng: yup.number().default(0),
    }),
  }),
  lazy: yup.lazy((value) => (value ? location.schema : yup.mixed())),
};
const mercadopago = {
  schema: yup.object<ServerTenant["mercadopago"]>({
    token: yup.string().default(""),
    refresh: yup.string().default(""),
    expiration: yup.number().default(0),
  }),
  lazy: yup.lazy((value) => (value ? mercadopago.schema : yup.mixed())),
};
const field = {
  schema: {
    text: yup.object({
      id: yup.string().required(),
      title: yup.string().required(),
      note: yup.string().default(""),
      required: yup.boolean().required().default(false),
      value: yup.string(),
    }),
    radio: yup.object({
      id: yup.string().required(),
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

export default {
  server: {
    fetch: yup.object<Partial<ServerTenant>>({
      id: yup.string().required(),
      slug: yup.string().required(),
      category: yup.string(),
      color: color.required(),
      phone: yup.string().required(),
      logo: yup.string(),
      title: yup.string(),
      instagram: yup.string(),
      facebook: yup.string(),
      twitter: yup.string(),
      keywords: yup.string(),
      banner: yup.string(),
      description: yup.string(),
      country: yup.string(),
      location: location.lazy,
      highlight: yup.string(),
      fields,
      flags,
      hook: yup.string(),
      mercadopago: mercadopago.lazy,
    }),
    update: yup.object<Partial<ServerTenant>>({
      id: yup.string().strip(true),
      slug: yup.string().strip(true),
      category: yup.string(),
      color,
      phone: yup.string(),
      logo: yup.string(),
      title: yup.string(),
      instagram: yup.string(),
      facebook: yup.string(),
      twitter: yup.string(),
      keywords: yup.string(),
      banner: yup.string(),
      description: yup.string(),
      country: yup.string(),
      location: location.lazy,
      highlight: yup.string(),
      fields,
      flags,
      hook: yup.string(),
      mercadopago: mercadopago.schema.strip(true),
    }),
    create: yup.object<Partial<ServerTenant>>({
      id: yup.string().strip(true),
      slug: yup.string().required(),
      category: yup.string(),
      color: color.default("teal"),
      phone: yup.string().default("5491173694572"),
      logo: yup.string(),
      title: yup.string().default("Pency - Tu tienda online fácil"),
      instagram: yup.string(),
      facebook: yup.string(),
      twitter: yup.string(),
      keywords: yup.string().default("pency, tienda, online, whatsapp, delivery, pedidos, shop"),
      banner: yup.string(),
      description: yup.string().default("Armá tu tienda y recibí los pedidos via WhatsApp"),
      country: yup.string().default("AR"),
      location: location.schema.default(null),
      highlight: yup.string(),
      fields,
      flags: flags.default([]),
      hook: yup.string(),
      mercadopago: mercadopago.schema.default(null),
    }),
    mercadopago: yup.object<Pick<ServerTenant, "mercadopago">>({
      mercadopago: mercadopago.schema,
    }),
  },
  client: {
    fetch: yup.object<ClientTenant>({
      id: yup.string().required(),
      slug: yup.string().required(),
      category: yup.string().default(""),
      color: color.required(),
      phone: yup.string().required(),
      logo: yup.string().default(""),
      title: yup.string().default(""),
      instagram: yup.string().default(""),
      facebook: yup.string().default(""),
      twitter: yup.string().default(""),
      keywords: yup.string().default(""),
      banner: yup.string().default(""),
      description: yup.string().default(""),
      country: yup.string().default(""),
      location: location.schema.default(null),
      highlight: yup.string().default(""),
      fields: fields.default([]),
      flags: flags.default([]),
      hook: yup.string().default(""),
      mercadopago: yup.boolean().transform(Boolean).default(false),
    }),
  },
};
