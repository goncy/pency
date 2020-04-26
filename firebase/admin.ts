import admin from "firebase-admin";

import certificate from "./credentials.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(certificate as admin.ServiceAccount),
    databaseURL: "https://pency-7affe.firebaseio.com",
  });
}

export const database = admin.firestore();
export const auth = admin.auth();
