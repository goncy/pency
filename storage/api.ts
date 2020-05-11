import {CloudinaryResponse, Format} from "./types";

export default {
  upload: (file: File, format: Format) => {
    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD}/image/upload?upload_preset=${
        format === "jpg" ? process.env.CLOUDINARY_PRESET_LOW : process.env.CLOUDINARY_PRESET_HIGH
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
