import {NextApiResponse, NextApiRequest} from "next";

import {parseClientTenant} from "~/tenant/selectors";
import cache from "~/tenant/cache";
import api from "~/tenant/api/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return api
      .list()
      .then((tenants) => {
        tenants.forEach((tenant) => {
          cache.set(tenant.slug, tenant);
        });

        return res.status(200).json(tenants.map(parseClientTenant));
      })
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  return res.status(304).end();
};
