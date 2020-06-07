import {NextApiResponse, NextApiRequest} from "next";

import productsHandler from "~/product/api/routes";
import tenantsHandler from "~/tenant/api/routes";
import tenantHandler from "~/tenant/api/routes/slug";
import paymentAuthHandler from "~/payment/api/routes/auth";
import paymentHandler from "~/payment/api/routes";

type NextQuery = NextApiRequest["query"];

interface Query extends NextQuery {
  // All routes and subroutes comes in [route, subroute, ...] format
  params: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    params: [path, ...params],
  } = req.query as Query;

  // We handle all the routes ourselves so only one lambda is deployed and we can access cache from any route
  switch (path) {
    case "tenant": {
      const [slug] = params;

      if (slug) {
        // /api/tenant/[slug]
        return tenantHandler(slug, req, res);
      } else {
        // /api/tenant
        return tenantsHandler(req, res);
      }
    }

    case "product": {
      // /api/product
      return productsHandler(req, res);
    }

    case "payment": {
      const [subroute] = params;

      if (subroute === "auth") {
        // /api/payment/auth
        return paymentAuthHandler(req, res);
      } else {
        // /api/payment
        return paymentHandler(req, res);
      }
    }
  }

  // If nothing matched, we return a 400
  return res.status(400).end();
};
