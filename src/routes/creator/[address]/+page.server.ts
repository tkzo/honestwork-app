import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { MongoClient } from 'mongodb';
import { error } from '@sveltejs/kit';

let cached_db: any = "" as any;
export const load: PageServerLoad = (async ({ params }) => {
  let skills: any;
  let user: any;
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
        salt: 0,
        email: 0,
        applications: 0,
        conversations: 0
      }
    }
    user = await cached_db.collection('users').findOne({ address: params.address }, options);
    skills = await cached_db.collection('skills').find({ useraddress: params.address }, { projection: { _id: 0 } }).toArray();
  } catch (err) {
    throw error(500, "Internal Server Error")
  }
  return { user: user, skills: skills };
}) satisfies PageServerLoad;
