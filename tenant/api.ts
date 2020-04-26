import fetch from "isomorphic-unfetch";

import firebase from "../firebase/client";

import {Tenant} from "./types";

export default {
  update: (tenant: Tenant) => firebase.database.collection("tenants").doc(tenant.id).update(tenant),
  fetch: (slug: Tenant["slug"]) =>
    fetch(`${process.env.BASE_URL}/api/tenant?slug=${slug}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res.status),
    ),
};
