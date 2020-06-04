import {NextApiRequest, NextApiResponse} from "next";
import shortid from "shortid";

import {ClientTenant} from "~/tenant/types";
import tenantCache from "~/tenant/cache";
import api from "~/tenant/api/server";
import {CartItem} from "~/cart/types";
import paymentsApi from "~/payment/api";
import cache from "~/payment/cache";
import {appendOrderId} from "~/payment/selectors";

interface PostRequest extends NextApiRequest {
  body: {
    successUrl: string;
    items: CartItem[];
  };
  query: {
    slug: ClientTenant["slug"];
  };
}

interface GetRequest extends NextApiRequest {
  query: {
    external_reference: string;
    collection_status: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      query: {slug},
      body: {items, successUrl},
    } = req as PostRequest;

    if (!items?.length || !successUrl) return res.status(304).end();

    const orderId = shortid.generate();
    const order = {
      id: orderId,
      slug,
      items,
      successUrl,
    };
    const cached = tenantCache.get(slug);

    cache.set(orderId, order);

    if (cached?.mercadopago?.token) {
      return paymentsApi
        .create(items, order, cached.mercadopago.token)
        .then((url) => res.status(200).json({url}))
        .catch(({status, statusText}) => res.status(status).end(statusText));
    }

    return api
      .fetch(slug)
      .then((tenant) => {
        return paymentsApi
          .create(items, order, tenant.mercadopago.token)
          .then((url) => res.status(200).json({url}));
      })
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "GET") {
    const {query} = req as GetRequest;

    try {
      if (query.collection_status === "approved") {
        const reference = JSON.parse(query.external_reference);

        if (reference.orderId) {
          const order = cache.get(reference.orderId);

          return res.status(200).json({
            ...order,
            successUrl: appendOrderId(order.successUrl, order.id),
          });
        }
      }
    } catch ({status = 400, statusText = "Bad request"}) {
      return res.status(status).end(statusText);
    }
  }

  return res.status(304).end();
};
