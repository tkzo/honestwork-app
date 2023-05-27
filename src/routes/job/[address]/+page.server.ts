import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { MongoClient, Db, type FindOptions } from 'mongodb';

let cached_db: Db = "" as any;

export const load: PageServerLoad = (async ({ params }) => {
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
    let options: FindOptions = {
      sort: { createdat: -1 },
      limit: 1,
      projection: {
        _id: 0,
      }
    };
    jobs = await cached_db.collection('jobs')
      .find({ useraddress: params.address }, options)
      .toArray();
    if (!jobs) {
      throw error(404, "Job not found");
    }
  } catch (err) {
    throw error(500, "Mongo fetch err:" + err)
  }
  return {
    job: jobs[0]
  }
}) satisfies PageServerLoad;
