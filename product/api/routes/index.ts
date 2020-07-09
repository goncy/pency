import {NextApiResponse, NextApiRequest} from "next";

import {Product} from "../../types";
import api from "../../api/server";

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

interface PutRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    tenant: ClientTenant["id"];
  };
  body: {
    products: Product[];
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

    return api
      .list(tenant)
      .then((products) => res.status(200).json(products || []))
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
          .then((product) => res.status(200).json(product))
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
          .then(() => res.status(200).json(product))
          .catch(() => res.status(400).end("Hubo un error actualizando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  if (req.method === "PUT") {
    const {
      // Extract tenant id
      query: {tenant},
      // Extract products to change
      body: {products},
      // Extract token
      headers: {authorization: token},
    } = req as PutRequest;

    // If we don't have a tenant, return 304
    if (!tenant) return res.status(304).end();

    // Verify that session es valid
    return (
      sessionApi
        .verify(token)
        .then(({uid}) => {
          // If the user doesn't belong to the tenant, return a 403
          if (uid !== tenant) return res.status(403).end();

          return (
            api
              // Upsert products
              .upsert(tenant, products)
              // As this is not just un update operation we have to return the products because it includes ids for created ones
              .then((products) => res.status(200).json(products))
              // If something failed, return a 400
              .catch(() => res.status(400).end("Hubo un error actualizando los productos"))
          );
        })
        // If the session is not valid, return a 401
        .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"))
    );
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
          .then(() => res.status(200).json({success: true}))
          .catch(() => res.status(400).end("Hubo un error borrando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
