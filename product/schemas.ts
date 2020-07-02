import * as yup from "yup";

import {Product, Variant, Option} from "./types";

interface Bulk {
  options: Pick<Variant, "options">[];
  price: Product["price"];
}

export default {
  fetch: yup.object<Product>({
    id: yup.string().required(),
    available: yup.boolean().default(false),
    title: yup.string().required().default(""),
    price: yup.number().required().default(0),
    options: yup
      .array(
        yup.object<Variant>({
          id: yup.string().required(),
          title: yup.string().required("El título de las variantes es requerido"),
          value: yup.array<Option>().nullable(),
          required: yup.boolean(),
          count: yup.number(),
          options: yup
            .array(
              yup.object<Option>({
                price: yup.number().required("El precio de las opciones de variantes es requerido"),
                id: yup.string().required("El id de opciones de variantes es requerido"),
                title: yup.string().required("El titulo de las opciones de variantes es requerido"),
              }),
            )
            .default([]),
        }),
      )
      .default([]),
    category: yup.string().default(""),
    description: yup.string().default(""),
    featured: yup.boolean().default(false),
    image: yup.string().default(""),
  }),
  bulk: yup.object<Bulk>({
    price: yup.number().required("El precio es requerido"),
    options: yup
      .array(
        yup.object({
          options: yup.array(
            yup.object<Option>({
              price: yup.number().required("El precio de las opciones de variantes es requerido"),
              id: yup.string().required("El id de opciones de variantes es requerido"),
              title: yup.string().required("El titulo de las opciones de variantes es requerido"),
            }),
          ),
        }),
      )
      .default([]),
  }),
};
