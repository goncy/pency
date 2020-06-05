import {NextApiRequest, NextApiResponse} from "next";

import {ClientTenant} from "~/tenant/types";
import api from "~/tenant/api/server";
import {CartItem} from "~/cart/types";
import paymentsApi from "~/payment/api/server";

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

    if (!items?.length) return res.status(304).end();

    return api
      .fetch(slug)
      .then((tenant) =>
        paymentsApi
          .create(items, slug, orderId, tenant.mercadopago.token)
          .then((response) => res.status(200).json(response)),
      )
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  return res.status(304).end();
};
