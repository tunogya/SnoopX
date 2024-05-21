import { MongoClient, ServerApiVersion, Db } from 'mongodb';
const uri = process.env.MONGODB_URI || "";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  try {
    if (cachedClient && cachedDb) {
      return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    const db = client.db("core");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    throw new Error('Failed to connect to database');
  }
}