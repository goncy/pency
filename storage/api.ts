import {CloudinaryResponse, Quality} from "./types";

export default {
  upload: (file: File, quality: Quality) => {
    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload?upload_preset=${
        quality === "high" ? process.env.CLOUDINARY_PRESET_HIGH : process.env.CLOUDINARY_PRESET_LOW
      }`,
      {
        method: "PUT",
        body: file,
      },
    )
      .then((response) => response.json())
      .then(({secure_url}: CloudinaryResponse) => secure_url);
  },
};
