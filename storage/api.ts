import {CloudinaryResponse, Quality} from "./types";

import reporter from "~/reporting";

export default {
  upload: (file: File, quality: Quality, subFolder: string = "") => {
    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload?upload_preset=${
        quality === "high" ? process.env.CLOUDINARY_PRESET_HIGH : process.env.CLOUDINARY_PRESET_LOW
      }&folder=${process.env.CLOUDINARY_FOLDER}/${subFolder}`,
      {
        method: "PUT",
        body: file,
      },
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(({secure_url}: CloudinaryResponse) => secure_url)
      .catch((error) => {
        // Report image upload failed to sentry
        reporter.message(error?.message || error?.statusText || "Error uploading an image", {
          origin: "image_upload",
          extras: {
            quality,
            slug: subFolder,
            message: error?.message,
            status: error?.status,
            statusText: error?.statusText,
          },
        });

        // Rethrow promise
        return Promise.reject(error);
      });
  },
};
