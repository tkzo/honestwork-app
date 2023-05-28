import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

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
    const query = { $text: { $search: `${params.input}` }, publish: true };
    jobs = await cached_db.collection('skills').find(query).toArray();
    if (!jobs) {
      throw error(404, "Job not found");
    }
  } catch (err) {
    throw error(500, "Mongo fetch err:" + err)
  }
  return json(jobs)
}
