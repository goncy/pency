import {NextApiRequest, NextApiResponse} from "next";

import {ClientTenant} from "~/tenant/types";
import {auth} from "~/firebase/admin";
import {parseClientTenant} from "~/tenant/selectors";
import cache from "~/tenant/cache";
import api from "~/tenant/api/server";
import {DEFAULT_SERVER_TENANT} from "~/tenant/constants";

interface GetRequest extends NextApiRequest {
  query: {
    slug: ClientTenant["slug"];
  };
}

interface PatchRequest extends NextApiRequest {
  headers: {
    authorization: string;
  };
  query: {
    slug: ClientTenant["slug"];
  };
  body: {
    tenant: ClientTenant;
  };
}

interface PostRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    secret: string;
  };
  query: {
    slug: ClientTenant["slug"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: {slug},
    } = req as GetRequest;

    const cached = cache.get(slug);

    if (cached) {
      return res.status(200).json(parseClientTenant(cached));
    }

    return api
      .fetch(slug)
      .then((tenant) => {
        cache.set(slug, tenant);

        return res.status(200).json(parseClientTenant(tenant));
      })
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "POST") {
    const {
      query: {slug},
      body: {email, password, secret},
    } = req as PostRequest;

    if (!email || !password || !slug || !secret || secret !== process.env.SECRET)
      return res.status(304).end();

    return api
      .create(email, password, {
        ...DEFAULT_SERVER_TENANT,
        slug,
      })
      .then(() => res.status(200).json({success: true}))
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  if (req.method === "PATCH") {
    const {
      body: {tenant},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!tenant) return res.status(304).end();

    return auth
      .verifyIdToken(token)
      .then(({uid}) => {
        if (uid !== tenant.id) return res.status(403).end();

        return api
          .update(tenant)
          .then(() => {
            cache.delete(tenant.slug);

            return res.status(200).json(parseClientTenant(tenant));
          })
          .catch(() => res.status(400).end("Hubo un error actualizando la tienda"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
