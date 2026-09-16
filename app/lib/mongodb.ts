import 'server-only';

import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim() || 'chon_chuan';

declare global {
  var chonChuanMongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Thiếu biến môi trường MONGODB_URI.');
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.connect();
}

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}

export async function getDatabase(): Promise<Db> {
  if (!globalThis.chonChuanMongoClientPromise) {
    globalThis.chonChuanMongoClientPromise = createClientPromise();
  }

  const client = await globalThis.chonChuanMongoClientPromise;
  return client.db(databaseName);
}
