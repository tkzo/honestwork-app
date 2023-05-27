import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

let cached_db: Db = "" as any;
export const GET: RequestHandler = async ({ params }) => {
  let conversations: any;
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    let options = {
      projection: { conversations: 1 }
    }
    let user = await cached_db.collection('users').findOne({ address: params.address }, options);
    if (!user) {
      conversations = await cached_db.collection('users').find({
        conversations: {
          $elemMatch: {
            matched_user: params.address
          }
        }
      }).toArray();
      return json(conversations);
    }
    conversations = user.conversations;
  } catch (err) {
    throw error(500, "Error getting conversations");
  }
  return json(conversations);
}
