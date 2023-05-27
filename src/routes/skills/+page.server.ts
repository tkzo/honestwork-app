import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';

let cached_db: Db = "" as any;

export const load: PageServerLoad = async ({ }) => {
  let skills: any;
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db) {
      skills = await cached_db.collection('skills').find({ "publish": true }).sort("createdat", -1).limit(10).toArray();
      for (let i = 0; i < skills.length; i++) {
        skills[i]._id = skills[i]._id.toString();
      }
      return { json: skills };
    }
    const client = new MongoClient(uri!);
    await client.connect();
    const database = client.db("honestwork-cluster");
    cached_db = database;
    skills = await cached_db.collection('skills').find({ "publish": true }).sort("createdat", -1).toArray();
    for (let i = 0; i < skills.length; i++) {
      skills[i]._id = skills[i]._id.toString();
    }
  } catch (err) {
    console.log("Mongo fetch err:", err);
  }
  return { json: skills };
};
