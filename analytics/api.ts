import firebase from "../firebase/client";

import {EventName, EventParams} from "./types";

export default {
  log: (eventName: EventName, eventParams: Partial<EventParams>) =>
    process.env.NODE_ENV === "production"
      ? firebase.analytics.logEvent(eventName, eventParams)
      : console.log("Analytics disabled: ", eventName, eventParams),
};
