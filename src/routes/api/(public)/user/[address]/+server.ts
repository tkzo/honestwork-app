import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ params }) => {
  let user;
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    user = await cached_db.collection('users').findOne({ address: params.address });
  } catch (err) {
    throw error(400, "Error:" + err)
  }
  return json(user);
};
