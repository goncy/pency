import {NextApiResponse, NextApiRequest} from "next";

import api from "~/tenant/api/server";
import schemas from "~/tenant/schemas";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return api
      .list()
      .then((tenants) =>
        res.status(200).json(tenants.map((tenant) => schemas.client.fetch.cast(tenant))),
      )
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  return res.status(304).end();
};
