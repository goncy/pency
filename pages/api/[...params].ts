import {NextApiResponse, NextApiRequest} from "next";

import productsHandler from "~/product/api/routes";
import tenantsHandler from "~/tenant/api/routes";
import tenantHandler from "~/tenant/api/routes/slug";
import paymentAuthHandler from "~/payment/api/routes/auth";
import paymentHandler from "~/payment/api/routes";

type NextQuery = NextApiRequest["query"];

interface Query extends NextQuery {
  params: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    params: [path, ...params],
  } = req.query as Query;

  switch (path) {
    case "tenant": {
      const [slug] = params;

      if (slug) {
        return tenantHandler(slug, req, res);
      } else {
        return tenantsHandler(req, res);
      }
    }

    case "product": {
      return productsHandler(req, res);
    }

    case "payment": {
      const [subroute] = params;

      if (subroute === "auth") {
        return paymentAuthHandler(req, res);
      } else {
        return paymentHandler(req, res);
      }
    }
  }

  return res.status(400).end();
};
