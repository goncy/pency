import {NextApiResponse, NextApiRequest} from "next";

import api from "~/product/api/server";
import {Product} from "~/product/types";
import {ClientTenant} from "~/tenant/types";
import sessionApi from "~/session/api/server";
import schemas from "~/product/schemas";

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
    product: Partial<Product>;
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

    if (!id || !product) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        const casted = schemas.client.create.cast(product, {stripUnkown: true});

        return api
          .create(id, casted)
          .then(() => res.status(200).json(casted))
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

    if (!id || !product) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        const casted = schemas.client.update.cast(product, {stripUnkown: true});

        return api
          .update(id, casted)
          .then(() => res.status(200).json(casted))
          .catch((error) =>
            res.status(400).json({
              message: "Hubo un error actualizando el producto",
              details: error,
            }),
          );
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
    if (!id || !products?.length) return res.status(304).end();

    // Verify that session es valid
    return (
      sessionApi
        .verify(token)
        .then(({uid}) => {
          // If the user doesn't belong to the id, return a 403
          if (uid !== id) return res.status(403).end();

          // Cast them as creations
          const casted = products.map((product) =>
            schemas.client.update.cast(product, {stripUnkown: true}),
          );

          return (
            api
              // Upsert products
              .upsert(id, casted)
              // As this is not just un update operation we have to return the products because it includes ids for created ones
              .then(() => res.status(200).json(casted))
              // If something failed, return a 400
              .catch((error) =>
                res.status(400).json({
                  message: "Hubo un error actualizando los productos",
                  details: error,
                }),
              )
          );
        })
        // If the session is not valid, return a 401
        .catch((error) =>
          res.status(401).json({
            message: "La sesión expiró, volvé a iniciar sesión para continuar",
            details: error,
          }),
        )
    );
  }

  if (req.method === "DELETE") {
    const {
      query: {id, product},
      headers: {authorization: token},
    } = req as DeleteRequest;

    if (!id || !product) return res.status(304).end();

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api
          .remove(id, product)
          .then(() => res.status(200).json({success: true}))
          .catch(() => res.status(400).end("Hubo un error borrando el producto"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
