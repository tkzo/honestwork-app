import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ params }) => {
  let jobs;
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
    jobs = await cached_db.collection('skills')
      .find({ useraddress: params.address })
      .sort({ createdat: -1 })
      .toArray();
  } catch (err) {
    throw error(500, "Mongo fetch err:" + err)
  }
  return json(jobs);
};
