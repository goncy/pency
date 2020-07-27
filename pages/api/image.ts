import fs from "fs";

import formidable from "formidable";
import {NextApiRequest, NextApiResponse} from "next";

import api from "~/storage/api/server";
import {Quality} from "~/storage/types";

interface PutRequest extends NextApiRequest {
  query: {
    folder: string;
    quality: Quality;
  };
  body: Buffer;
}

// Disable body parser so formidable can take images from body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // If a PUT was made
  if (req.method === "PUT") {
    const {
      // Extract folder and quality from query
      query: {folder = "", quality = "low"},
    } = req as PutRequest;

    try {
      const image: Buffer = await new Promise((resolve, reject) => {
        // Initialize form data
        const form = new formidable.IncomingForm();

        // Parse files
        form.parse(req, async (err, _fields, files) => {
          // If we have an error
          if (err) {
            // Reject promise
            return reject(err);
          }

          // Read from buffer
          const file = fs.readFileSync(files.image.path);

          // Return the file
          return resolve(file);
        });
      });

      // If we don't have all the data we need
      if (!image) {
        // Return a 304
        return res.status(304).end();
      }

      try {
        // Optimize image
        const optimized = await api.optimize(image, quality);

        try {
          // Send that values to the DB
          const url = await api.upload(optimized, folder);

          // If everything is fine, return the url along with a 200
          return res.status(200).json({url});
        } catch (error) {
          //  If something went wrong
          return res.status(400).end("Hubo un error subiendo la imagen");
        }
      } catch (e) {
        //  If something went wrong
        return res.status(400).end("Hubo un error comprimiendo la imagen");
      }
    } catch (error) {
      //  If something went wrong
      return res.status(400).end("Hubo un error parseando la imagen");
    }
  }

  // If non of the above happend, return a 304
  return res.status(304).end();
};
