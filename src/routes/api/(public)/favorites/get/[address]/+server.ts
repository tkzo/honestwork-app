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
    let options = {
      projection: { _id: 0, favorites: 1 }
    }
    user = await cached_db.collection('users').findOne({ address: params.address }, options);
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json(user?.favorites);
};
