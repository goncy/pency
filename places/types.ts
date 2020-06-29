import {Place as PlaceData} from "@googlemaps/google-maps-services-js";

export interface Place {
  coordinates: PlaceData["geometry"]["location"];
  address: PlaceData["formatted_address"];
}
