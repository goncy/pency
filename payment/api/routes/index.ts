import {NextApiRequest, NextApiResponse} from "next";

import paymentsApi from "../server";

import {ClientTenant} from "~/tenant/types";
import tenantApi from "~/tenant/api/server";
import {CartItem} from "~/cart/types";
import {getExpirationDate} from "~/payment/selectors";
import schemas from "~/tenant/schemas";

interface PostRequest extends NextApiRequest {
  body: {
    items: CartItem[];
    slug: ClientTenant["slug"];
    orderId: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      body: {slug, items, orderId},
    } = req as PostRequest;

    // If we don't have items we can't create a preference
    if (!items?.length) return res.status(304).end();

    try {
      // We get the tenant
      const tenant = await tenantApi.fetch(slug);

      // If we have a mercadopago token...
      if (tenant.mercadopago?.token) {
        // If the token is expired
        if (tenant.mercadopago?.expiration < +new Date() && tenant.mercadopago?.refresh) {
          try {
            // We get new credentials
            const credentials = await paymentsApi.refresh(tenant.mercadopago.refresh);

            // Update the tenant with the new credentials
            await tenantApi.update(
              tenant.id,
              tenant.slug,
              schemas.server.mercadopago.cast({
                mercadopago: {
                  token: credentials.access_token,
                  refresh: credentials.refresh_token,
                  expiration: getExpirationDate(credentials.expires_in),
                },
              }),
            );

            // Create the preference with new credentials
            const preference = await paymentsApi.create(
              items,
              slug,
              orderId,
              credentials.access_token,
            );

            // Return the preference
            return res.status(200).json(preference);
          } catch (error) {
            try {
              // If we failed at refreshing, we reset mercadopago for this shop
              await tenantApi.update(
                tenant.id,
                tenant.slug,
                schemas.server.mercadopago.cast({
                  mercadopago: null,
                }),
              );

              // We return a 400 for that
              return res.status(400).end("Se desconectó la tienda de mercado pago");
            } catch (error) {
              // If we also fail at reseting, we just return
              return res.status(400).end("No se pudo desconectar mercado pago de la tienda");
            }
          }
        }

        // If we have a valid token and is not expired, we create a preference
        const preference = await paymentsApi.create(items, slug, orderId, tenant.mercadopago.token);

        // And return that to the use
        return res.status(200).json(preference);
      }

      // If tenant doesn't have mercadopago configured, we return a 400
      return res.status(400).end("La tienda no tiene mercado pago configurado");
    } catch (error) {
      // If we fail at getting the tenant, return the status and reason
      return res.status(error.status).end(error.statusText);
    }
  }

  // If nothing happened, return a 304
  return res.status(304).end();
};
