import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import {FirebaseService} from "./types";

export default new Proxy(
  {
    get database() {
      return firebase.firestore();
    },
    get analytics() {
      return firebase.analytics();
    },
    get auth() {
      return firebase.auth();
    },
    providers: {
      get google() {
        return new firebase.auth.GoogleAuthProvider();
      },
    },
  },
  {
    get: function (target, name: FirebaseService) {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        });
      }

      return target[name];
    },
  },
);
