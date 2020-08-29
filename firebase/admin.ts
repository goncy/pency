import admin from "firebase-admin";

import credentials from "./credentials";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials[process.env.ENV] as admin.ServiceAccount),
  });
}

export const firestore = admin.firestore;
export const database = admin.firestore();
export const auth = admin.auth();
