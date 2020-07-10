import * as yup from "yup";

import {Product, Variant, Option} from "./types";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_OPTION, DEFAULT_PRODUCT_VARIANT} from "./constants";

export default {
  server: {
    create: yup.object<Product>({
      id: yup.string().strip(true),
      visibility: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "hidden"])
        .default(DEFAULT_PRODUCT.visibility),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.originalPrice),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.image),
    }),
    update: yup.object<Partial<Product>>({
      id: yup.string().required(),
      title: yup.string().nullable(),
      category: yup.string().trim().nullable(),
      description: yup.string().nullable(),
      price: yup.number().nullable(),
      originalPrice: yup.number().nullable(),
      visibility: yup.string().oneOf(["available", "unavailable", "ask", "hidden"]).nullable(),
      featured: yup.boolean().nullable(),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().required().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(1),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .nullable(),
      image: yup.string().nullable(),
    }),
  },
  client: {
    fetch: yup.object<Product>({
      id: yup.string().required(),
      visibility: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "hidden"])
        .default(DEFAULT_PRODUCT.visibility),
      title: yup.string().required().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .default(DEFAULT_PRODUCT.originalPrice),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().default(DEFAULT_PRODUCT_VARIANT.value),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.image),
    }),
    update: yup.object<Partial<Product>>({
      visibility: yup.string().oneOf(["available", "unavailable", "ask", "hidden"]).nullable(),
      category: yup.string().trim().nullable(),
      description: yup.string().nullable(),
      featured: yup.boolean().nullable(),
      id: yup.string().required(),
      image: yup.string().nullable(),
      options: yup
        .array(
          yup.object<Variant>({
            id: yup.string().required(),
            title: yup.string().required().default(DEFAULT_PRODUCT_VARIANT.title),
            value: yup.array<Option>().strip(true),
            required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
            count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
            options: yup
              .array(
                yup.object<Option>({
                  price: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .nullable(),
      price: yup.number().nullable(),
      originalPrice: yup.number().nullable(),
      title: yup.string().nullable(),
    }),
    create: yup.object<Product>({
      id: yup.string().strip(true),
      visibility: yup
        .string()
        .oneOf(["available", "unavailable", "ask", "hidden"])
        .default(DEFAULT_PRODUCT.visibility),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.price),
      originalPrice: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .default(DEFAULT_PRODUCT.originalPrice),
      options: yup
        .array(
          yup
            .object<Variant>({
              id: yup.string().required(),
              title: yup.string().default(DEFAULT_PRODUCT_VARIANT.title),
              value: yup.array<Option>().strip(true),
              required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
              count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
              options: yup
                .array(
                  yup.object<Option>({
                    price: yup
                      .number()
                      .transform((value) => (isNaN(value) ? undefined : value))
                      .default(DEFAULT_PRODUCT_OPTION.price),
                    id: yup.string().required(),
                    title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                  }),
                )
                .default([]),
            })
            .nullable(),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category).trim(),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.image),
    }),
  },
  csv: yup.object<Partial<Product>>({
    visibility: yup.string().oneOf(["available", "unavailable", "ask", "hidden"]).nullable(),
    category: yup.string().trim().nullable(),
    description: yup
      .string()
      .transform((value) => value || "")
      .nullable(),
    featured: yup.boolean().nullable(),
    id: yup.string().nullable(),
    image: yup
      .string()
      .transform((value) => value || "")
      .nullable(),
    options: yup
      .array(
        yup.object<Variant>({
          id: yup.string().required(),
          title: yup.string().required().trim().default(DEFAULT_PRODUCT_VARIANT.title),
          value: yup.array<Option>().strip(true),
          required: yup.boolean().default(DEFAULT_PRODUCT_VARIANT.required),
          count: yup.number().default(DEFAULT_PRODUCT_VARIANT.count),
          options: yup
            .array(
              yup.object<Option>({
                price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
                id: yup.string().required(),
                title: yup.string().trim().default(DEFAULT_PRODUCT_OPTION.title),
              }),
            )
            .default([]),
        }),
      )
      .nullable(),
    price: yup.number().nullable(),
    originalPrice: yup.number().nullable(),
    title: yup.string().nullable(),
  }),
};
