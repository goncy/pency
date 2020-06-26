import {Client, PlaceInputType} from "@googlemaps/google-maps-services-js";

import {Place} from "../types";

const client = new Client({});

export default {
  search: (query: string): Promise<Place[] | void> => {
    return client
      .findPlaceFromText({
        params: {
          key: process.env.GOOGLE_API_KEY,
          input: query,
          inputtype: PlaceInputType.textQuery,
          fields: ["geometry", "formatted_address"],
        },
      })
      .then((results) =>
        results.data.candidates.map((candidate) => ({
          coordinates: candidate.geometry.location,
          address: candidate.formatted_address,
        })),
      );
  },
};
