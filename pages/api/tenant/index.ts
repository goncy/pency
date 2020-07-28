import {NextApiResponse, NextApiRequest} from "next";

import api from "~/tenant/api/server";
import schemas from "~/tenant/schemas";

interface GetRequest extends NextApiRequest {
  query: {
    secret: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      // We extract the slug from query
      query: {secret},
    } = req as GetRequest;

    // If we don't have everything we need
    if (secret !== process.env.SECRET) {
      // Return a 304
      return res.status(304).end();
    }

    return api
      .list()
      .then((tenants) =>
        res.status(200).json(tenants.map((tenant) => schemas.client.fetch.cast(tenant))),
      )
      .catch(({status, statusText}) => res.status(status).end(statusText));
  }

  return res.status(304).end();
};
