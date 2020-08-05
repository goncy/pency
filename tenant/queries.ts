import {FilterQuery} from "mongodb";

import {ServerTenant} from "./types";

import dates from "~/utils/date";
import {DEFAULT_CLIENT_TENANT} from "~/tenant/constants";

export default {
  get relevant(): FilterQuery<ServerTenant> {
    return {
      // Has a category
      category: {
        $exists: true,
        $nin: [null, ""],
      },
      // Has a logo
      logo: {
        $exists: true,
        $nin: [null, ""],
      },
      // Changed phone
      phone: {
        $ne: DEFAULT_CLIENT_TENANT.phone,
      },
      // Changed title
      title: {
        $ne: DEFAULT_CLIENT_TENANT.title,
      },
      // Non free tiers
      tier: {
        $exists: true,
        $nin: ["free"],
      },
      // Changed description
      description: {
        $ne: DEFAULT_CLIENT_TENANT.description,
      },
      // Updated in the last month
      updatedAt: {
        $gte: dates.now - 2592000000,
      },
      // Has products
      "products.0": {
        $exists: true,
      },
    };
  },
};
