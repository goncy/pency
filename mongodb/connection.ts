import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  if (!client.isConnected()) await client.connect();

  return client.db(process.env.DB_NAME);
}

export default connect;
