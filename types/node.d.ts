declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_DATABASE_URL: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID: string;
    CLOUDINARY_CLOUD: string;
    CLOUDINARY_PRESET_LOW: string;
    CLOUDINARY_PRESET_HIGH: string;
    FIREBASE_PRIVATE_KEY_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_CLIENT_ID: string;
    FIREBASE_AUTH_URI: string;
    FIREBASE_TOKEN_URI: string;
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
    FIREBASE_CLIENT_X509_CERT_URL: string;
    FIREBASE_PRIVATE_KEY: string;
    SECRET: string;
    SENTRY_DSN: string;
    MANTAINER_EMAIL: string;
  }
}
