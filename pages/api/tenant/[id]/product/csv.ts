import {NextApiResponse, NextApiRequest} from "next";
import * as yup from "yup";

import api from "~/tenant/api/server";
import productApi from "~/product/api/server";
import {ClientTenant} from "~/tenant/types";
import schemas from "~/tenant/schemas";
import {CURRENCIES} from "~/i18n/constants";
import {toCSV} from "~/utils/csv";

interface GetRequest extends NextApiRequest {
  query: {
    id: ClientTenant["id"];
  };
}

// Filter relevant products
const schema = yup.object({
  type: yup.string().oneOf(["available", "unavailable", "variant", "promotional", "ask"]),
});

// Transform products
const selector = (tenant: ClientTenant) =>
  yup
    .object({
      id: yup.string(),
      title: yup.string().transform((title) => title || "Producto sin título"),
      description: yup
        .string()
        .transform((description) => description || "Producto sin descripción"),
      availability: yup
        .string()
        .transform((type) => (type === "unavailable" ? "out of stock" : "in stock")),
      condition: yup.string().default("new"),
      price: yup
        .string()
        .transform((price) => `${Number(price || 0).toFixed(2)} ${CURRENCIES[tenant.country]}`),
      link: yup.string().transform((id) => `${process.env.APP_URL}/${tenant.slug}?product=${id}`),
      image_link: yup.string().transform((image) => image || tenant.logo || tenant.banner),
      brand: yup.string().transform(() => tenant.title),
    })
    .from("type", "availability")
    .from("image", "image_link")
    .from("title", "brand", true)
    .from("id", "link", true);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // If a GET was made
  if (req.method === "GET") {
    const {
      // Extract id from query
      query: {id},
    } = req as GetRequest;

    // If we don't have all the data we need
    if (!id) {
      // Return a 304
      return res.status(304).end();
    }

    // Store tenant
    return (
      api
        // Get tenant from DB
        .fetch(id)
        // If everything is fine, return the tenant along with a 200
        .then((tenant) => {
          const casted = schemas.client.fetch.cast(tenant);

          // Fetch products
          return productApi.list(id).then((products) => {
            // Format products
            const filtered = products
              .filter((product) => schema.isValidSync(product))
              .map((product) => selector(casted).cast(product, {stripUnknown: true}));

            return toCSV(filtered, [
              "id",
              "title",
              "description",
              "availability",
              "condition",
              "price",
              "link",
              "image_link",
              "brand",
            ]).then((csv) => {
              // Set header to download as file
              res.setHeader("Content-Disposition", "attachment; filename=pency.csv");

              // If everything is ok, return a 200
              return res.status(200).end(csv);
            });
          });
        })
        // Otherwise return a 400
        .catch((error) =>
          res.status(400).json({
            message: "Hubo un error obteniendo la tienda",
            details: error,
          }),
        )
    );
  }

  // If nothing matched return a 304
  return res.status(304).end();
};
