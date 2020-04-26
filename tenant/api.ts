import firebase from "../firebase/client";

import {Tenant} from "./types";

export default {
  update: (tenant: Tenant) => firebase.database.collection("tenants").doc(tenant.id).update(tenant),
};
