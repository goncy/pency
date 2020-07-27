import fs from "fs";

import {NextApiResponse, NextApiRequest} from "next";
import * as yup from "yup";

import {database} from "~/firebase/admin";
import {ServerTenant, Field, TextField, RadioField} from "~/tenant/types";
import {Product} from "~/product/types";
import productSchemas from "~/product/schemas";
import {Place} from "~/places/types";
import {DEFAULT_CLIENT_TENANT} from "~/tenant/constants";

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
const tier = yup.string().oneOf(["free", "preferential", "commercial"]);
const products = {
  schema: yup.array().of(productSchemas.client.fetch),
  lazy: yup.lazy((value: Product[]) =>
    value?.length
      ? products.schema
      : yup
          .mixed()
          .transform(() => null)
          .oneOf([null]),
  ),
};

const migration = yup.object<ServerTenant>({
  id: yup.string().required(),
  slug: yup.string().default("should-delete").required(),
  category: yup.string().default("other").nullable(),
  color: color.default("teal").required(),
  products: products.schema.default(DEFAULT_CLIENT_TENANT.products).required(),
  createdAt: yup.number().default(DEFAULT_CLIENT_TENANT.createdAt),
  updatedAt: yup.number().default(DEFAULT_CLIENT_TENANT.updatedAt),
  phone: yup.string().required().default("5491173694572"),
  logo: yup.string().nullable(),
  title: yup.string().default("Pency - Tu tienda online fácil").required(),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  twitter: yup.string().nullable(),
  keywords: yup.string().nullable(),
  banner: yup.string().nullable(),
  description: yup.string().default("").nullable(),
  country: yup.string().default(DEFAULT_CLIENT_TENANT.country).nullable(),
  tier: tier.default(DEFAULT_CLIENT_TENANT.tier),
  tierUntil: yup.number().default(DEFAULT_CLIENT_TENANT.tierUntil).required(),
  location: location.schema.default(null).nullable(),
  highlight: yup.string().default("").nullable(),
  layout: layout.default(DEFAULT_CLIENT_TENANT.layout).nullable(),
  fields: fields.default(DEFAULT_CLIENT_TENANT.fields).nullable(),
  flags: flags.default(DEFAULT_CLIENT_TENANT.flags).nullable(),
  hook: yup.string().nullable(),
  mercadopago: mercadopago.lazy,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // If a POST was made
    case "GET": {
      // Store resolved and rejected operations
      const summary = {
        resolved: [],
        rejected: [],
      };

      // Memory buffer
      let buffer = [];

      // Count
      let count = 0;

      // Total
      let total = 0;

      // Iterate all tenants
      try {
        const tenants = await database
          .collection("tenants")
          .limit(100)
          .get()
          .then((snapshot) =>
            snapshot.docs.map((doc) => ({
              ...(doc.data() as ServerTenant),
              id: doc.id,
            })),
          );

        for (const tenant of tenants) {
          console.log(`Completado al ${Math.round(((total + 1) * 100) / tenants.length)}%`);

          try {
            // Download products for tenant
            const raw = await database
              .collection("tenants")
              .doc(tenant.id)
              .collection("products")
              .get()
              .then((snapshot) => {
                return {
                  ...tenant,
                  products: snapshot.docs.map((doc) => ({
                    ...(doc.data() as Product),
                    id: doc.id,
                  })),
                };
              });

            try {
              // Cast it
              const casted = migration.cast(raw, {stripUnknown: true});

              try {
                // Push to buffer
                buffer.push(casted);

                // Increment count
                count++;

                // Increment total
                total++;

                if (count >= 50) {
                  // Write file
                  fs.writeFileSync(
                    `public/chunks/chunk-${+new Date()}.json`,
                    JSON.stringify(buffer),
                  );

                  // Reset count
                  count = 0;

                  // Reset buffer
                  buffer = [];
                }

                // Add tenant slug to resolved summary
                summary.resolved.push({slug: tenant.slug, details: +new Date()});

                // Go to next tenant
                continue;
              } catch (error) {
                // If something failed, log a message
                console.log({
                  title: `Hubo un error agregando ${tenant.slug} al buffer`,
                  details: error.message,
                });

                // Increment total
                total++;

                // Add tenant slug to rejected summary
                summary.rejected.push({slug: tenant.slug, details: error.message});

                // Go to next tenant
                continue;
              }
            } catch (error) {
              // If something failed, log a message
              console.log({
                title: `Hubo un error convirtiendo los productos de ${tenant.slug} a formato pency`,
                details: error.message,
              });

              // Increment total
              total++;

              // Add tenant slug to rejected summary
              summary.rejected.push({slug: tenant.slug, details: error.message});

              // Go to next tenant
              continue;
            }
          } catch (error) {
            // If something failed, send an email
            console.log({
              title: `Hubo un error descargando los productos por FTP de ${tenant.slug}`,
              details: error.message,
            });

            // Increment total
            total++;

            // Add tenant slug to rejected summary
            summary.rejected.push({slug: tenant.slug, details: error.message});

            // Go to next tenant
            continue;
          }
        }

        try {
          // Log job finish
          console.log("Proceso terminado!");

          // If everything went fine, return a 200
          return res.status(200).json(summary);
        } catch (error) {
          // If something failed, send an email
          console.log({
            title: "Hubo un error creando la nueva versión de la aplicación",
            details: error.message,
            summary,
          });

          // Return the response with a 400 and a detail
          return res.status(400).json({
            title: "Hubo un error creando la nueva versión de la aplicación",
            details: error.message,
            summary,
          });
        }
      } catch (error) {
        // If something failed, send an email
        console.log({
          title: "Hubo un error obteniendo las tiendas",
          details: error.message,
          summary,
        });

        // Return the response with a 400 and a detail
        return res.status(400).json({
          title: "Hubo un error obteniendo las tiendas",
          details: error.message,
          summary,
        });
      }
    }

    default: {
      // If nothing matched, we return a 404
      return res.status(404).end();
    }
  }
};
