import shortid from "shortid";

import {ServerTenant} from "../types";
import Tenant from "../model";

import connection from "~/mongodb/connection";
import {auth} from "~/firebase/admin";
import {Product} from "~/product/types";

export default {
  create: async (email: string, password: string, tenant: ServerTenant) => {
    await connection();

    const match = await Tenant.findOne({slug: tenant.slug}).lean();

    if (match) {
      return Promise.reject({statusText: "Esa tienda ya existe", status: 409});
    }

    const user = await auth.createUser({
      email,
      password,
    });

    return await Tenant.create({id: user.uid, ...tenant});
  },
  fetch: async (slug: ServerTenant["slug"]): Promise<ServerTenant> => {
    await connection();

    const tenant = await Tenant.findOne({slug});

    if (!tenant) {
      return Promise.reject({statusText: "La tienda no existe", status: 404});
    }

    return tenant.toJSON();
  },
  list: async (): Promise<ServerTenant[]> => {
    await connection();

    const tenants = await Tenant.find();

    if (!tenants.length) {
      return Promise.reject({statusText: "No hay tiendas", status: 404});
    }

    return tenants;
  },
  update: async (id: ServerTenant["id"], value: Partial<ServerTenant>) => {
    await connection();

    return await Tenant.updateOne({id}, value, {new: true}).lean();
  },
  product: {
    create: async (tenant: ServerTenant["id"], product: Product) => {
      await connection();

      const draft = {
        ...product,
        id: shortid.generate(),
      };

      await Tenant.findOneAndUpdate(
        {
          id: tenant,
        },
        {
          $push: {
            products: draft,
          },
        },
        {new: true},
      );

      return draft;
    },
    update: async (tenant: ServerTenant["id"], product: Product) => {
      await connection();

      return await Tenant.findOneAndUpdate(
        {
          id: tenant,
          "products.id": product.id,
        },
        {
          $set: {
            "products.$": product,
          },
        },
        {new: true},
      );
    },
    upsert: async (tenant: ServerTenant["id"], products: Product[]) => {
      await connection();

      // Find original tenant
      const draft = await Tenant.findOne({
        id: tenant,
      });

      // Get modified product ids
      const ids = products.map((product) => product.id);

      // Update draft products
      draft.products = draft.products
        // Remove old ones
        .filter((_product) => !ids.includes(_product.id))
        // Add new ones
        .concat(products);

      // Save model
      const result = await draft.save();

      // Return products
      return result.toJSON().products;
    },
    remove: async (tenant: ServerTenant["id"], product: Product["id"]) => {
      await connection();

      return await Tenant.findOneAndUpdate(
        {
          id: tenant,
        },
        {
          $pull: {
            products: {id: product},
          },
        },
        {new: true},
      );
    },
  },
};
