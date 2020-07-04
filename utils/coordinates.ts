interface Coordinates {
  lat: number;
  lng: number;
}

const KM = 6371;

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistance(start: Coordinates, end: Coordinates) {
  const dLat = deg2rad(end.lat - start.lat);
  const dLon = deg2rad(end.lng - start.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) *
      Math.cos(deg2rad(end.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return KM * c;
}
