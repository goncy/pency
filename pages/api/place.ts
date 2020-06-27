import {NextApiResponse, NextApiRequest} from "next";

import api from "~/places/api/server";

interface GetRequest extends NextApiRequest {
  // Get request query
  query: {
    // String to search
    query: string;
    // Region
    region: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Call different methods depending on the method
  switch (req.method) {
    case "GET": {
      const {
        // We get the query from the query
        query: {query, region},
      } = req as GetRequest;

      try {
        // Get the results from the api
        const results = await api.search(query, region);

        // If everything is fine, return the results
        return res.status(200).json(results);
      } catch (error) {
        // Return a 400 if something failed
        return res.status(400).json({error});
      }
    }
  }

  // If nothing matched, we return a 400
  return res.status(400).end();
};
