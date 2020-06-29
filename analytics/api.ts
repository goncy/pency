import firebase from "../firebase/client";

import {EventName, EventParams} from "./types";

export default {
  log: (eventName: EventName, eventParams: Partial<EventParams>) =>
    process.env.NODE_ENV === "production" && process.env.FIREBASE_MEASUREMENT_ID
      ? firebase.analytics.logEvent(eventName, eventParams)
      : console.info("Analytics disabled: ", eventName, eventParams),
};
