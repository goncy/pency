import {NextApiResponse, NextApiRequest} from "next";

import api from "~/tenant/api/server";
import {ClientTenant} from "~/tenant/types";
import dates from "~/utils/date";
import schemas from "~/tenant/schemas";

interface PostRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    secret: string;
    slug: ClientTenant["slug"];
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // When a POST request is made
  if (req.method === "POST") {
    const {
      // We extract what we need from the body
      body: {email, password, secret, slug},
    } = req as PostRequest;

    // If we don't have everything we need
    if (!email || !password || !slug || !secret || secret !== process.env.SECRET) {
      // Return a 304
      return res.status(304).end();
    }

    // Store a temp tenant
    const tenant = schemas.client.create.cast(
      {
        // Tenant slug
        slug,
        // Grace period
        tier: "commercial",
        // 1 week from now
        tierUntil: dates.oneWeekFromNow,
      },
      {stripUnkown: true},
    );

    return (
      api
        // Create the tenant
        .create(email, password, tenant)
        // If everything went fine, return a 200
        .then(() => res.status(200).json({success: true}))
        // Otherwise return an error
        .catch(({status, statusText}) => res.status(status).end(statusText))
    );
  }

  // If nothing matched return a 304
  return res.status(304).end();
};
