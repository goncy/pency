import {Tenant} from "~/tenant/types";
import {database, auth} from "~/firebase/admin";
import {DEFAULT_TENANT} from "~/tenant/constants";

interface Request {
  method: "GET" | "POST";
}

interface GetRequest extends Request {
  query: {
    slug: Tenant["slug"];
  };
}

interface PostRequest extends Request {
  query: {
    slug: Tenant["slug"];
    email: string;
    password: string;
  };
}

const api = {
  create: (email: string, password: string, slug: string) =>
    auth
      .createUser({
        email,
        password,
      })
      .then((user) => {
        database
          .collection("tenants")
          .doc(user.uid)
          .create({
            id: user.uid,
            slug,
            ...DEFAULT_TENANT,
          });
      }),
  fetch: (slug: Tenant["slug"]) =>
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
      .then((doc) => ({id: doc.id, ...(doc.data() as Tenant)})),
};

export default (req, res) => {
  if (req.method === "GET") {
    const {
      query: {slug},
    } = req as GetRequest;

    if (!slug) res.status(304);

    return api
      .fetch(slug)
      .then((tenant) => res.status(200).json(tenant))
      .catch((error) => res.status(error.status).end(error.statusText));
  }

  if (req.method === "POST") {
    const {
      query: {slug, email, password},
    } = req as PostRequest;

    if (process.env.NODE_ENV === "production") res.status(404);

    return api.create(email, password, slug).then(() => res.status(200).json({success: true}));
  }

  res.status(304).end();
};
