import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db, type FindOptions } from 'mongodb';
import { error, json } from '@sveltejs/kit';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ }) => {
  let recent_whitelist: any;
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      const database = client.db("honestwork-cluster");
      cached_db = database;
    }
    let options: FindOptions = {
      sort: { createdat: -1 },
      limit: 1,
      projection: {
        _id: 0,
      }
    };
    recent_whitelist = await cached_db.collection('whitelists')
      .find({}, options)
      .toArray();
    if (!recent_whitelist) {
      throw error(404, "Whitelist not found");
    }
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json(recent_whitelist[0].addresses)
}
