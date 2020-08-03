import {FilterQuery} from "mongodb";

import {ServerTenant, ClientTenant} from "../types";
import schemas from "../schemas";

import connection from "~/mongodb/connection";
import {auth} from "~/firebase/admin";
import dates from "~/utils/date";

export default {
  create: async (email: string, password: string, tenant: Partial<ServerTenant>) => {
    // Connect to DB
    const db = await connection();

    // Check if tenant already exist
    const match = await db.collection<ServerTenant>("tenants").findOne({slug: tenant.slug});

    // If already exists
    if (match) {
      // Return a 409
      return Promise.reject({statusText: "Esa tienda ya existe", status: 409});
    }

    // Create the user for this tenant
    const user = await auth.createUser({
      email,
      password,
    });

    // Cast it
    const casted = schemas.server.create.cast(tenant, {stripUnknown: true});

    // Set timestamps
    casted.createdAt = dates.now;
    casted.updatedAt = dates.now;

    // Create the tenant
    const result = await db
      .collection("tenants")
      .updateOne({id: user.uid}, {$set: casted}, {upsert: true});

    // Return the created tenant
    return result;
  },
  fetch: async (
    query: FilterQuery<ServerTenant> = {},
    project: Record<string, number> = {},
  ): Promise<ServerTenant> => {
    // Connect to DB
    const db = await connection();

    // Find the tenant
    const tenant = await db.collection<ServerTenant>("tenants").findOne(query, project);

    // If we don't have a match
    if (!tenant) {
      // Return a 404
      return Promise.reject({statusText: "La tienda no existe", status: 404});
    }

    // Cast it
    const casted = schemas.server.fetch.cast(tenant, {stripUnknown: true});

    // Stringify
    return casted;
  },
  list: async (
    query: FilterQuery<ServerTenant> = {},
    project: Record<string, number> = {},
  ): Promise<ServerTenant[]> => {
    // Connect to DB
    const db = await connection();

    // Get all tenants
    const tenants = await db.collection<ServerTenant>("tenants").find(query, project);

    // If no tenants
    if (!tenants.count) {
      // Return a 404
      return Promise.reject({statusText: "No hay tiendas", status: 404});
    }

    // Convert to array
    const list = await tenants.toArray();

    // Cast it
    const casted = list.map((tenant) => schemas.server.fetch.cast(tenant, {stripUnknown: true}));

    // Return them as array
    return casted;
  },
  update: async (id: ServerTenant["id"], value: Partial<ServerTenant> | Partial<ClientTenant>) => {
    // Connect to DB
    const db = await connection();

    // Cast it
    const casted = schemas.server.update.cast(value, {stripUnknown: true});

    // Set updated timestamp
    casted.updatedAt = dates.now;

    // Updated specified tenant
    return await db.collection("tenants").updateOne({id}, {$set: casted});
  },
};
