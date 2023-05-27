import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, type Db } from 'mongodb';

let cached_db: Db = "" as any;

export const load: PageServerLoad = async ({ cookies, parent }) => {
  const { signed } = await parent();
  const userAddress = cookies.get('honestwork_address')!;
  if (signed) {
    let jobs = await getJobs(userAddress);
    return { jobs: jobs };
  } else {
    throw redirect(301, '/auth');
  }
};

const getJobs = async (address: string) => {
  let jobs: any;
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
    jobs = await cached_db.collection('jobs').find({ useraddress: address }).sort("createdat", -1).toArray();
    for (let i = 0; i < jobs.length; i++) {
      jobs[i]._id = jobs[i]._id.toString();
    }
  } catch (err) {
    console.log("Mongo fetch err:", err);
  }
  return { json: jobs };
};
