import { MongoClient, ServerApiVersion, Db } from 'mongodb';
const uri = process.env.MONGODB_URI || "";

export async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    const db = client.db("core");

    return { client, db };
  } catch (error) {
    throw new Error('Failed to connect to database');
  }
}