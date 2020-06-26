declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_DATABASE_URL: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID: string;
    GOOGLE_API_KEY: string;
    CLOUDINARY_CLOUD: string;
    CLOUDINARY_PRESET_LOW: string;
    CLOUDINARY_PRESET_HIGH: string;
    MERCADOPAGO_CLIENT_SECRET: string;
    MERCADOPAGO_CLIENT_ID: string;
    MANTAINER_EMAIL: string;
    MANTAINER_PHONE: string;
    SENTRY_DSN: string;
    ENCRYPTION_IV: string;
    ENCRYPTION_KEY: string;
    APP_URL: string;
    SECRET: string;
    ENV: string;
  }
}
