import {Product} from "~/product/types";
import {Tenant} from "~/tenant/types";
import {database} from "~/firebase/admin";

interface Request {
  method: "GET" | "PATCH" | "DELETE";
}

interface GetRequest extends Request {
  query: {
    tenant: Tenant["id"];
  };
}

interface PatchRequest extends Request {
  query: {
    tenant: Tenant["id"];
    product: Product;
  };
}

interface DeleteRequest extends Request {
  query: {
    tenant: Tenant["id"];
    product: Product["id"];
  };
}

const api = {
  create: (tenant: Tenant["id"], product: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .add(product)
      .then((snapshot) => ({...product, id: snapshot.id})),
  remove: (tenant: Tenant["id"], product: Product["id"]) =>
    database.collection("tenants").doc(tenant).collection("products").doc(product).delete(),
  update: (tenant: Tenant["id"], product: Product) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .doc(product.id)
      .update(product),
  list: (tenant: Tenant["id"]) =>
    database
      .collection("tenants")
      .doc(tenant)
      .collection("products")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => ({id: doc.id, ...(doc.data() as Product)}))),
};

export default (req: Request, res) => {
  if (req.method === "GET") {
    const {
      query: {tenant},
    } = req as GetRequest;

    if (!tenant) res.status(304);

    return api.list(tenant).then((products) => res.status(200).json(products));
  }

  if (req.method === "PATCH") {
    const {
      query: {tenant, product},
    } = req as PatchRequest;

    if (!tenant) res.status(304);

    return api.update(tenant, product).then((product) => res.status(200).json(product));
  }

  if (req.method === "DELETE") {
    const {
      query: {tenant, product},
    } = req as DeleteRequest;

    if (!tenant) res.status(304);

    return api.remove(tenant, product).then((product) => res.status(200).json(product));
  }

  res.status(304).end();
};
