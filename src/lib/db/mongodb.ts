import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __omniderMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoConfig() {
  const uri = process.env.MONGO_URI;
  const database = process.env.MONGO_DATABASE;

  if (!uri) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  if (!database) {
    throw new Error("Missing MONGO_DATABASE environment variable");
  }

  return { uri, database };
}

function createClientPromise(uri: string) {
  const client = new MongoClient(uri);
  return client.connect();
}

export async function getMongoClient() {
  const { uri } = getMongoConfig();

  if (!globalThis.__omniderMongoClientPromise) {
    globalThis.__omniderMongoClientPromise = createClientPromise(uri);
  }

  return globalThis.__omniderMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const { database } = getMongoConfig();
  const client = await getMongoClient();
  return client.db(database);
}
