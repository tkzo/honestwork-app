import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import type { SortDirection } from 'mongodb';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ params }) => {
  let skills;
  let sortby = params.sortby as string;
  let limit = parseInt(params.limit as string);
  let offset = parseInt(params.offset as string);
  let order: SortDirection = parseInt(params.order as string) == -1 ? -1 : 1;
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
    skills = await cached_db.collection('skills')
      .find({ published: true })
      .sort(sortby, order)
      .skip(offset)
      .limit(limit)
      .toArray();
  } catch (err: any) {
    throw error(500, err.body.message)
  }
  return json(skills);
};
