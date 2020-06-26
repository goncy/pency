export interface Candidate {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface Place {
  coordinates: Candidate["geometry"]["location"];
  address: Candidate["formatted_address"];
}

export interface Search {
  candidates: Candidate[];
  status: string;
}
