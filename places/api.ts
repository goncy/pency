import mock from "./mock";
import {Search, Place} from "./types";

import fetch from "~/utils/fetch";

export default {
  search: (query: string, country: string): Promise<Place[] | void> => {
    return (process.env.ENV === "development"
      ? Promise.resolve(mock.search(query))
      : fetch(
          "GET",
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${window.encodeURIComponent(
            query,
          )}&key=${process.env.GOOGLE_API_KEY}&region=${country}`,
        )
    ).then(({candidates}: Search) =>
      candidates.map(
        (candidate): Place => ({
          coordinates: candidate.geometry.location,
          address: candidate.formatted_address,
        }),
      ),
    );
  },
};
