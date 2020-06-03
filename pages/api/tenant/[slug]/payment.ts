import {NextApiRequest, NextApiResponse} from "next";

import {ClientTenant} from "~/tenant/types";
import cache from "~/tenant/cache";
import api from "~/tenant/api/server";
import {CartItem} from "~/cart/types";

interface PostRequest extends NextApiRequest {
  body: {
    successUrl: string;
    items: CartItem[];
  };
  query: {
    slug: ClientTenant["slug"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      query: {slug},
      body: {items, successUrl},
    } = req as PostRequest;

    if (!items?.length || !successUrl) return res.status(304).end();

    const cached = cache.get(slug);

    if (cached?.mercadopago?.token) {
      return api
        .preference(items, successUrl, cached.mercadopago.token)
        .then((url) => res.status(200).json({url}))
        .catch(({status, statusText}) => res.status(status).end(statusText));
    }

    return api
      .fetch(slug)
      .then((tenant) => {
        return api
          .preference(items, successUrl, tenant.mercadopago.token)
          .then((url) => res.status(200).json({url}));
      })
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  return res.status(304).end();
};
