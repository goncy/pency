import nextConnect from "next-connect";
import {NextApiResponse, NextApiRequest} from "next";

import database from "~/mongodb/database";

const handler = nextConnect();

handler.use(database);

interface GetRequest extends NextApiRequest {
  db: any;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const {db} = req as GetRequest;

  let doc = await db.collection("tenants").findOne();

  console.log(doc);

  res.json(doc);
});

export default handler;
