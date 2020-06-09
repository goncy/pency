import admin from "firebase-admin";

import credentials from "./credentials";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials[process.env.NODE_ENV] as admin.ServiceAccount),
  });
}

export const database = admin.firestore();
export const auth = admin.auth();
