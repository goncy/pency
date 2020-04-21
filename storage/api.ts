import {CloudinaryResponse} from "./types";

export default {
  upload: (file: File) => {
    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload?upload_preset=${process.env.REACT_APP_CLOUDINARY_PRESET}`,
      {
        method: "PUT",
        body: file,
      },
    )
      .then((response) => response.json())
      .then(({secure_url}: CloudinaryResponse) => secure_url);
  },
};
