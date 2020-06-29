import {NextApiRequest, NextApiResponse} from "next";

import {ClientTenant, ServerTenant} from "~/tenant/types";
import schemas from "~/tenant/schemas";
import api from "~/tenant/api/server";
import sessionApi from "~/session/api/server";

interface PatchRequest extends NextApiRequest {
  headers: {
    authorization?: string;
  };
  body: {
    tenant: ClientTenant | ServerTenant;
  };
}

interface PostRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    secret: string;
  };
}

export default async (slug: ClientTenant["slug"], req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return api
      .fetch(slug)
      .then((tenant) => res.status(200).json(schemas.client.fetch.cast(tenant)))
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "POST") {
    const {
      body: {email, password, secret},
    } = req as PostRequest;

    if (!email || !password || !slug || !secret || secret !== process.env.SECRET)
      return res.status(304).end();

    return api
      .create(email, password, schemas.server.create.cast({slug}))
      .then(() => res.status(200).json({success: true}))
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "PATCH") {
    const {
      body: {tenant},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!tenant || !tenant?.id || !tenant?.slug) return res.status(304).end();

    const {id, slug, ...rest} = tenant;

    return sessionApi
      .verify(token)
      .then(({uid}) => {
        if (uid !== id) return res.status(403).end();

        return api
          .update(id, slug, schemas.server.update.cast(rest))
          .then(() => res.status(200).json(tenant))
          .catch(() => res.status(400).end("Hubo un error actualizando la tienda"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
