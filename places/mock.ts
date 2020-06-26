import {Search} from "./types";

export default {
  search: (query: string): Search => {
    return {
      candidates: [
        {
          formatted_address: query,
          geometry: {
            location: {
              lat: -33.8599358,
              lng: 151.2090295,
            },
          },
        },
      ],
      status: "OK",
    };
  },
};
