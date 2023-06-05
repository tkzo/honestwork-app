import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  let skills;
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
    let user = await cached_db.collection('users').findOne({ address: userAddress });
    if (user == null) {
      throw error(401, "Unauthorized");
    }
    let verified = verifyMember(user.salt, userAddress, userSignature);
    if (!verified) {
      throw error(401, "Unauthorized");
    }
    skills = await cached_db.collection('skills').find({ useraddress: userAddress }).sort("slot", 1).toArray();
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json(skills);
};

