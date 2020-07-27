import {MongoClient} from "mongodb";

const client = new MongoClient(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authSource=${process.env.DB_NAME}&readPreference=primary`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

async function connect() {
  if (!client.isConnected()) await client.connect();

  return client.db(process.env.DB_NAME);
}

export default connect;
