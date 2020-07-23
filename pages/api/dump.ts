import {NextApiResponse, NextApiRequest} from "next";

import {database} from "~/firebase/admin";
import {ServerTenant} from "~/tenant/types";
import {Product} from "~/product/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Call different methods depending on the method
  switch (req.method) {
    case "GET": {
      try {
        const tenants = await database
          .collection("tenants")
          .get()
          .then((snapshot) =>
            snapshot.docs.map((doc) => ({
              ...(doc.data() as ServerTenant),
              id: doc.id,
            })),
          );

        const withProducts = await Promise.all(
          tenants.map((tenant) => {
            return database
              .collection("tenants")
              .doc(tenant.id)
              .collection("products")
              .get()
              .then((snapshot) => {
                return {
                  ...tenant,
                  products: snapshot.docs.map((doc) => ({
                    ...(doc.data() as Product),
                    id: doc.id,
                  })),
                };
              });
          }),
        );
        return res.status(200).json(withProducts);
      } catch (error) {
        // Return a 400 if something failed
        return res.status(400).json({error});
      }
    }
  }

  // If nothing matched, we return a 400
  return res.status(400).end();
};
