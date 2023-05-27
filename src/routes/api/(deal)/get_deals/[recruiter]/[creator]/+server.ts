import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

// todo: test

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ params }) => {
  let deals: any;
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
    let query = {
      recruiter: params.recruiter,
      creator: params.creator,
    }
    deals = await cached_db.collection('deals').findOne(query);
    if (!deals) {
      deals = {
        recruiter: params.recruiter,
        creator: params.creator,
        deals: []
      }
    }
  } catch (err: any) {
    throw error(500, err)
  }
  return json(deals)
}
