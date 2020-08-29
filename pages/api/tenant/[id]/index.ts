import {NextApiRequest, NextApiResponse} from "next";

import {ClientTenant} from "~/tenant/types";
import schemas from "~/tenant/schemas";
import api from "~/tenant/api/server";
import sessionApi from "~/session/api/server";

interface GetRequest extends NextApiRequest {
  headers: {
    authorization?: string;
  };
  query: {
    id: ClientTenant["id"];
  };
}

interface PatchRequest extends NextApiRequest {
  headers: {
    authorization?: string;
  };
  query: {
    id: ClientTenant["id"];
  };
  body: {
    tenant: ClientTenant;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // If a GET was made
  if (req.method === "GET") {
    const {
      // Extract id from query
      query: {id},
      // And the token from headers
      headers: {authorization: token},
    } = req as GetRequest;

    // If we don't have all the data we need
    if (!id || !token) {
      // Return a 304
      return res.status(304).end();
    }

    return (
      sessionApi
        // Verify that the user requesting the changes is the valid one
        .verify(token)
        .then(({uid}) => {
          // If its not, return a 403
          if (uid !== id) return res.status(403).end();

          return (
            api
              // Send that values to the DB
              .fetch(id)
              // If everything is fine, return the tenant along with a 200
              .then((tenant) => res.status(200).json(schemas.client.fetch.cast(tenant)))
              // Otherwise return a 400
              .catch(() => res.status(400).end("Hubo un error obteniendo la tienda"))
          );
        })
        // If thats not the user, return a 401
        .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"))
    );
  }

  // If a PATCH was made
  if (req.method === "PATCH") {
    const {
      // Extract the changes from the body
      body: {tenant},
      // Extract id from query
      query: {id},
      // And the token from headers
      headers: {authorization: token},
    } = req as PatchRequest;

    // If we don't have all the data we need
    if (!tenant || !tenant?.id || !tenant?.slug) {
      // Return a 304
      return res.status(304).end();
    }

    return (
      sessionApi
        // Verify that the user requesting the changes is the valid one
        .verify(token)
        .then(({uid}) => {
          // If its not, return a 403
          if (uid !== id) return res.status(403).end();

          // Cast it
          const casted = schemas.client.update.cast(tenant, {stripUnknown: true});

          return (
            api
              // Send that values to the DB
              .update(id, casted)
              // If everything is fine, return the tenant along with a 200
              .then(() => res.status(200).json(casted))
              // Otherwise return a 400
              .catch(() => res.status(400).end("Hubo un error actualizando la tienda"))
          );
        })
        // If thats not the user, return a 401
        .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"))
    );
  }

  // If non of the above happend, return a 304
  return res.status(304).end();
};
