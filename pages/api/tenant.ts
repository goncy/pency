import {Tenant} from "~/tenant/types";
import {database} from "~/firebase/admin";

interface Request {
  method: "GET" | "PATCH";
}

interface GetRequest extends Request {
  query: {
    slug: Tenant["slug"];
  };
}

interface PatchRequest extends Request {
  query: {
    tenant: Tenant;
  };
}

const api = {
  update: (tenant: Tenant) => database.collection("tenants").doc(tenant.id).update(tenant),
  fetch: (slug: Tenant["slug"]) =>
    database
      .collection("tenants")
      .where("slug", "==", slug)
      .limit(1)
      .get()
      .then((snapshot) =>
        snapshot.empty ? Promise.reject("La tienda no existe") : snapshot.docs[0],
      )
      .then((doc) => ({id: doc.id, ...(doc.data() as Tenant)})),
};

export default (req, res) => {
  if (req.method === "GET") {
    const {
      query: {slug},
    } = req as GetRequest;

    if (!slug) res.status(304);

    return api.fetch(slug).then((tenant) => res.status(200).json(tenant));
  }

  if (req.method === "PATCH") {
    const {
      query: {tenant},
    } = req as PatchRequest;

    if (!tenant) res.status(304);

    return api.update(tenant).then((tenant) => res.status(200).json(tenant));
  }

  res.status(304).end();
};
