import {Product} from "~/product/types";
import {Tenant} from "~/tenant/types";
import {database} from "~/firebase/admin";

interface Request {
  method: "GET";
}

interface GetRequest extends Request {
  query: {
    tenant: Tenant["id"];
  };
}

const api = {
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

    return api
      .list(tenant)
      .then((products) => res.status(200).json(products))
      .catch((error) => res.status(error.status).end(error.statusText));
  }

  res.status(304).end();
};
