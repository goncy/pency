import * as yup from "yup";

import {Product, Variant, Option} from "./types";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_OPTION, DEFAULT_PRODUCT_VARIANT} from "./constants";

export default {
  server: {
    create: yup.object<Product>({
      id: yup.string().strip(true),
      available: yup.boolean().default(DEFAULT_PRODUCT.available),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup.number().default(DEFAULT_PRODUCT.price),
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
                  price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.image),
    }),
    update: yup.object({
      id: yup.string().required(),
      title: yup.string().nullable(),
      description: yup.string().nullable(),
      price: yup.number().nullable(),
      available: yup.boolean().nullable(),
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
                  price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
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
      available: yup.boolean().default(false),
      title: yup.string().required().default(DEFAULT_PRODUCT.title),
      price: yup.number().required().default(DEFAULT_PRODUCT.price),
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
                  price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
                  id: yup.string().required(),
                  title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.title),
      description: yup.string().default(DEFAULT_PRODUCT.title),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.title),
    }),
    update: yup.object({
      id: yup.string().required(),
      title: yup.string().nullable(),
      description: yup.string().nullable(),
      price: yup.number().nullable(),
      available: yup.boolean().nullable(),
      featured: yup.boolean().nullable(),
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
                  price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
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
    create: yup.object<Product>({
      id: yup.string().strip(true),
      available: yup.boolean().default(DEFAULT_PRODUCT.available),
      title: yup.string().default(DEFAULT_PRODUCT.title),
      price: yup.number().default(DEFAULT_PRODUCT.price),
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
                    price: yup.number().default(DEFAULT_PRODUCT_OPTION.price),
                    id: yup.string().required(),
                    title: yup.string().default(DEFAULT_PRODUCT_OPTION.title),
                  }),
                )
                .default([]),
            })
            .nullable(),
        )
        .default([]),
      category: yup.string().default(DEFAULT_PRODUCT.category),
      description: yup.string().default(DEFAULT_PRODUCT.description),
      featured: yup.boolean().default(DEFAULT_PRODUCT.featured),
      image: yup.string().default(DEFAULT_PRODUCT.image),
    }),
  },
};
