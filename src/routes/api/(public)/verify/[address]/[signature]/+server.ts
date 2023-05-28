import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;

export const GET: RequestHandler = async ({ params }) => {
  let user;
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
    user = await cached_db.collection('users').findOne({ address: params.address });
    if (user == null) {
      throw error(401, "Unauthorized");
    }
    let verified = verifyMember(user.salt, params.address as string, params.signature as string);
    if (!verified) {
      throw error(401, "Unauthorized");
    }
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json("success");
};
