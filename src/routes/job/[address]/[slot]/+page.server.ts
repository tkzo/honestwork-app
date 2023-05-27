import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { MongoClient, Db } from 'mongodb';

let cached_db: Db = "" as any;

export const load: PageServerLoad = (async ({ params }) => {
  let job: any;
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
    let options = {
      projection: {
        _id: 0,
      }
    };
    job = await cached_db.collection('jobs')
      .findOne({ useraddress: params.address, slot: parseInt(params.slot) }, options);
    if (!job) {
      throw error(404, "Job not found");
    }
  } catch (err: any) {
    throw error(500, err)
  }
  return {
    job: job
  }
}) satisfies PageServerLoad;
