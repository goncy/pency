export default {
  search: (query: string) => {
    return [
      {
        formatted_address: query,
        geometry: {
          location: {
            lat: -33.8599358,
            lng: 151.2090295,
          },
        },
      },
    ];
  },
};
