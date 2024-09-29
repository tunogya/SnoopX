import { DataAPIClient } from "@datastax/astra-db-ts";
const uri = process.env.DATASTAX_DB_URI || "";
const token = process.env.DATASTAX_DB_TOKEN || "";

export async function connectToDatabase() {
  try {
    const client = new DataAPIClient(token);
    const db = client.db(uri);

    return { client, db };
  } catch (error) {
    throw new Error('Failed to connect to database');
  }
}