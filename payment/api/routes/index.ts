import {NextApiRequest, NextApiResponse} from "next";

import paymentsApi from "../server";

import {ClientTenant} from "~/tenant/types";
import api from "~/tenant/api/server";
import {CartItem} from "~/cart/types";

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

    try {
      const tenant = await api.fetch(slug);
      const preference = await paymentsApi.create(items, slug, orderId, tenant.mercadopago.token);

      return res.status(200).json(preference);
    } catch (error) {
      return res.status(error.status).end(error.statusText);
    }
  }

  return res.status(304).end();
};
