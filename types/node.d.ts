declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    CLOUDINARY_CLOUD: string;
    CLOUDINARY_PRESET: string;
  }
}
