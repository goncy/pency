import {NextApiResponse, NextApiRequest} from "next";

import api from "~/tenant/api/server";
import {Product} from "~/product/types";
import {ClientTenant} from "~/tenant/types";
import sessionApi from "~/session/api/server";

interface PostRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    id: ClientTenant["id"];
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
    id: ClientTenant["id"];
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
    id: ClientTenant["id"];
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
    product: Product["id"];
    id: ClientTenant["id"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      query: {id},
      body: {product},
      headers: {authorization: token},
    } = req as PostRequest;

    if (!id) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api.product
          .create(id, product)
          .then((product) => res.status(200).json(product))
          .catch(() => res.status(400).end("Hubo un error creando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  if (req.method === "PATCH") {
    const {
      query: {id},
      body: {product},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!id) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api.product
          .update(id, product)
          .then(() => res.status(200).json(product))
          .catch(() => res.status(400).end("Hubo un error actualizando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  if (req.method === "PUT") {
    const {
      // Extract id id
      query: {id},
      // Extract products to change
      body: {products},
      // Extract token
      headers: {authorization: token},
    } = req as PutRequest;

    // If we don't have a id, return 304
    if (!id) return res.status(304).end();

    // Verify that session es valid
    return (
      sessionApi
        .verify(token)
        .then(({uid}) => {
          // If the user doesn't belong to the id, return a 403
          if (uid !== id) return res.status(403).end();

          return (
            api.product
              // Upsert products
              .upsert(id, products)
              // As this is not just un update operation we have to return the products because it includes ids for created ones
              .then((products) => res.status(200).json(products))
              // If something failed, return a 400
              .catch((e) => {
                console.log(e);
                return res.status(400).end("Hubo un error actualizando los productos");
              })
          );
        })
        // If the session is not valid, return a 401
        .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"))
    );
  }

  if (req.method === "DELETE") {
    const {
      query: {id, product},
      headers: {authorization: token},
    } = req as DeleteRequest;

    if (!id) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api.product
          .remove(id, product)
          .then(() => res.status(200).json({success: true}))
          .catch((err) => res.status(400).end("Hubo un error borrando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
