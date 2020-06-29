import {Client} from "@googlemaps/google-maps-services-js";

import {Place} from "../types";

const client = new Client({});

export default {
  search: (query: string, region: string): Promise<Place[] | void> => {
    return client
      .textSearch({
        params: {
          key: process.env.GOOGLE_API_KEY,
          query,
          region,
        },
      })
      .then((results) =>
        results.data.results.slice(0, 5).map((result) => ({
          coordinates: result.geometry.location,
          address: result.formatted_address,
        })),
      );
  },
};
