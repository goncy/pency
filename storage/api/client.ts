import {StorageResponse, Quality} from "../types";

import reporter from "~/reporting";

export default {
  upload: (file: File, quality: Quality, folder: string = "") => {
    // If file size > 2mb
    if (file.size > 2048000) {
      // Reject with error
      return Promise.reject({
        status: 304,
        message: `El tamaño máximo de imágenes es de 2mb (2048000) pero esta imágen pesa ${parseFloat(
          Number(file.size / 1000000).toFixed(2),
        )}mb (${file.size})`,
      });
    }

    // Creates form data
    const data = new FormData();

    // Append file
    data.append("image", file);

    // Send request
    return fetch(`/api/image?quality=${quality}&folder=${folder}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(({url}: StorageResponse) => url)
      .catch((error) => {
        // Report image upload failed to sentry
        reporter.message(error?.message || error?.statusText || "Error uploading an image", {
          origin: "image_upload",
          extras: {
            quality,
            slug: folder,
            message: error?.message,
            status: error?.status,
            statusText: error?.statusText,
          },
        });

        // Rethrow promise
        return Promise.reject({
          status: 400,
          message:
            "Hubo un error subiendo la imágen, intentá de nuevo mas tarde o probá cargando otra imágen",
        });
      });
  },
};
