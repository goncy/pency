import {Product} from "~/product/types";
import {Tenant} from "~/tenant/types";
import {database, auth} from "~/firebase/admin";

interface Request {
  method: "GET" | "PATCH" | "DELETE" | "POST";
  query?: any;
}

interface GetRequest extends Request {
  query: {
    tenant: Tenant["id"];
  };
}

interface PostRequest extends Request {
  headers: {
    authorization: string;
  };
  query: {
    tenant: Tenant["id"];
  };
  body: {
    product: Product;
  };
}

const cache = new Map();

interface PatchRequest extends Request {
  headers: {
    authorization: string;
  };
  query: {
    tenant: Tenant["id"];
  };
  body: {
    product: Product;
  };
}

interface DeleteRequest extends Request {
  headers: {
    authorization: string;
  };
  query: {
    tenant: Tenant["id"];
    product: Product["id"];
  };
}

const api = {
  list: async (tenant: Tenant["id"]): Promise<Product[]> =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({...(doc.data() as Product), id: doc.id})))
      .then((products) => {
        cache.set(tenant, products);

        return products;
      }),
  create: (tenant: Tenant["id"], product: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(product)
      .then((snapshot) => ({...product, id: snapshot.id})),
  remove: (tenant: Tenant["id"], product: Product["id"]) =>
    database.collection("tenants").doc(tenant).collection("products").doc(product).delete(),
  update: (tenant: Tenant["id"], {id, ...product}: Product) =>
    database.collection("tenants").doc(tenant).collection("products").doc(id).update(product),
};

export default async (req: Request, res) => {
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

    return auth.verifyIdToken(token).then(({uid}) => {
      if (uid !== tenant) return res.status(403).end();

      return api.create(tenant, product).then((product) => {
        cache.delete(tenant);

        return res.status(200).json(product);
      });
    });
  }

  if (req.method === "PATCH") {
    const {
      query: {tenant},
      body: {product},
      headers: {authorization: token},
    } = req as PatchRequest;

    if (!tenant) return res.status(304).end();

    return auth.verifyIdToken(token).then(({uid}) => {
      if (uid !== tenant) return res.status(403).end();

      return api.update(tenant, product).then(() => {
        cache.delete(tenant);

        return res.status(200).json(product);
      });
    });
  }

  if (req.method === "DELETE") {
    const {
      query: {tenant, product},
      headers: {authorization: token},
    } = req as DeleteRequest;

    if (!tenant) return res.status(304).end();

    return auth.verifyIdToken(token).then(({uid}) => {
      if (uid !== tenant) return res.status(403).end();

      return api.remove(tenant, product).then(() => {
        cache.delete(tenant);

        return res.status(200).json({success: true});
      });
    });
  }

  return res.status(304).end();
};
