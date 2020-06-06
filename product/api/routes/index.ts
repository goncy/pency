import {NextApiResponse, NextApiRequest} from "next";

import {Product} from "../../types";
import api from "../../api/server";
import cache from "../../cache";

import {ClientTenant} from "~/tenant/types";
import sessionApi from "~/session/api/server";

interface GetRequest extends NextApiRequest {
  query: {
    tenant: ClientTenant["id"];
  };
}

interface PostRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    tenant: ClientTenant["id"];
  };
  body: {
    product: Product;
  };
}

interface PatchRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    tenant: ClientTenant["id"];
  };
  body: {
    product: Product;
  };
}

interface DeleteRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    tenant: ClientTenant["id"];
    product: Product["id"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: {tenant},
    } = req as GetRequest;

    if (!tenant) return res.status(304).end();

    const cached = cache.get(tenant);

    if (cached) {
      return res.status(200).json(cached);
    }

    return api
      .list(tenant)
      .then((products) => {
        cache.set(tenant, products);

        return res.status(200).json(products || []);
      })
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "POST") {
    const {
      query: {tenant},
      body: {product},
      headers: {authorization: token},
    } = req as PostRequest;

    if (!tenant) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== tenant) return res.status(403).end();

        return api
          .create(tenant, product)
          .then((product) => {
            cache.delete(tenant);

            return res.status(200).json(product);
          })
          .catch(() => res.status(400).end("Hubo un error creando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  if (req.method === "PATCH") {
    const {
      query: {tenant},
      body: {product},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!tenant) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== tenant) return res.status(403).end();

        return api
          .update(tenant, product)
          .then(() => {
            cache.delete(tenant);

            return res.status(200).json(product);
          })
          .catch(() => res.status(400).end("Hubo un error actualizando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  if (req.method === "DELETE") {
    const {
      query: {tenant, product},
      headers: {authorization: token},
    } = req as DeleteRequest;

    if (!tenant) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== tenant) return res.status(403).end();

        return api
          .remove(tenant, product)
          .then(() => {
            cache.delete(tenant);

            return res.status(200).json({success: true});
          })
          .catch(() => res.status(400).end("Hubo un error borrando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
