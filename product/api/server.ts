import mongodb from "mongodb";

import {Product} from "../types";
import schemas from "../schemas";

import {ServerTenant} from "~/tenant/types";
import connection from "~/mongodb/connection";
import dates from "~/utils/date";

export default {
  create: async (tenant: ServerTenant["id"], product: Product): Promise<number> => {
    // Connect to DB
    const db = await connection();

    // Cast it
    const casted = schemas.server.create.cast(product, {stripUnknown: true});

    // Set id
    casted.id = new mongodb.ObjectID().toHexString();

    // Set timestamps
    casted.createdAt = dates.now;
    casted.updatedAt = dates.now;

    // Store result
    const result = await db.collection<ServerTenant>("tenants").updateOne(
      {
        id: tenant,
      },
      {
        $set: {
          updatedAt: dates.now,
        },
        $push: {
          products: casted,
        },
      },
    );

    // Return result
    return result.modifiedCount;
  },
  remove: async (tenant: ServerTenant["id"], product: Product["id"]): Promise<number> => {
    // Connect to DB
    const db = await connection();

    // Remove document from DB
    const result = await db.collection<ServerTenant>("tenants").updateOne(
      {
        id: tenant,
      },
      {
        $set: {
          updatedAt: dates.now,
        },
        $pull: {
          products: {id: product},
        },
      },
    );

    // Return modified count
    return result.modifiedCount;
  },
  update: async (tenant: ServerTenant["id"], product: Partial<Product>): Promise<number> => {
    // Connect to DB
    const db = await connection();

    // Cast it
    const casted = schemas.server.update.cast(product, {stripUnknown: true});

    // Set timestamp
    casted.updatedAt = dates.now;

    // Update
    const result = await db.collection<ServerTenant>("tenants").updateOne(
      {
        id: tenant,
        "products.id": casted.id,
      },
      {
        $set: {
          updatedAt: dates.now,
          "products.$": casted,
        },
      },
    );

    // Return modified count
    return result.modifiedCount;
  },
  upsert: async (tenant: ServerTenant["id"], products: Partial<Product>[]): Promise<number> => {
    const db = await connection();

    // Find original tenant
    const draft = await db.collection<ServerTenant>("tenants").findOne({
      id: tenant,
    });

    // Cast them
    const casted = products.map((product) => {
      // Cast tenant
      const casted = schemas.server.update.cast(product, {stripUnknown: true}) as Product;

      // Set id for new ones
      casted.id = casted.id || new mongodb.ObjectID().toHexString();

      // Set timestamps
      casted.createdAt = casted.createdAt || dates.now;
      casted.updatedAt = dates.now;

      // Return casted tenant
      return casted;
    });

    // Get modified product ids
    const ids = casted.map((product) => product.id);

    // Update draft products
    const updated = draft.products
      // Remove old ones
      .filter((_product) => !ids.includes(_product.id))
      // Add new ones
      .concat(casted);

    // Update
    const result = await db.collection<ServerTenant>("tenants").updateOne(
      {id: tenant},
      {
        $set: {
          updatedAt: dates.now,
          products: updated,
        },
      },
    );

    // Return matched count
    return result.matchedCount;
  },
};
