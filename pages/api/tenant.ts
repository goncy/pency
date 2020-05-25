import {Tenant} from "~/tenant/types";
import {database, auth} from "~/firebase/admin";
import {DEFAULT_TENANT} from "~/tenant/constants";

interface Request {
  method: "GET" | "POST" | "PATCH";
}

interface GetRequest extends Request {
  query: {
    slug: Tenant["slug"];
  };
}

interface PatchRequest extends Request {
  headers: {
    authorization: string;
  };
  query: {
    slug: Tenant["slug"];
  };
  body: {
    tenant: Tenant;
  };
}

interface PostRequest extends Request {
  body: {
    email: string;
    password: string;
    secret: string;
  };
  query: {
    slug: Tenant["slug"];
  };
}

const cache = new Map();

const api = {
  create: (email: string, password: string, slug: string) =>
    database
      .collection("tenants")
      .where("slug", "==", slug)
      .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? auth
              .createUser({
                email,
                password,
              })
              .then((user) =>
                database
                  .collection("tenants")
                  .doc(user.uid)
                  .create({
                    slug,
                    ...DEFAULT_TENANT,
                  }),
              )
              .catch(({errorInfo}) => Promise.reject({statusText: errorInfo.message, status: 400}))
          : Promise.reject({statusText: "Esa tienda ya existe", status: 409}),
      ),
  fetch: async (slug: Tenant["slug"]): Promise<Tenant> =>
    database
      .collection("tenants")
      .where("slug", "==", slug)
      .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? Promise.reject({statusText: "La tienda no existe", status: 404})
          : snapshot.docs[0],
      )
      .then((doc) => ({...(doc.data() as Tenant), id: doc.id})),
  list: async (): Promise<Tenant[]> =>
    database
      .collection("tenants")
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? Promise.reject({statusText: "No hay tiendas", status: 404})
          : snapshot.docs,
      )
      .then((docs) => docs.map((doc) => ({...(doc.data() as Tenant), id: doc.id}))),
  update: async ({id, ...tenant}: Tenant) => database.collection("tenants").doc(id).update(tenant),
};

export default async (req, res) => {
  if (req.method === "GET") {
    const {
      query: {slug},
    } = req as GetRequest;

    if (!slug) {
      return api
        .list()
        .then((tenants) => {
          tenants.forEach((tenant) => {
            cache.set(tenant.slug, tenant);
          });

          return res.status(200).json(tenants);
        })
        .catch(({status, statusText}) => res.status(status).end(statusText));
    }

    const cached = cache.get(slug);

    if (cached) {
      return res.status(200).json(cached);
    }

    return api
      .fetch(slug)
      .then((tenant) => {
        cache.set(slug, tenant);

        return res.status(200).json(tenant);
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
      .create(email, password, slug)
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

            return res.status(200).json(tenant);
          })
          .catch(() => res.status(400).end("Hubo un error actualizando la tienda"));
      })
      .catch(() => res.status(401).end("La sesión expiró, volvé a iniciar sesión para continuar"));
  }

  return res.status(304).end();
};
