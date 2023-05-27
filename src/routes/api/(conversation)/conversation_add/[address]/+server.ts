import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

// todo: delete this comment :)

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ params, cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  let user: any;
  let existing: any;
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
    existing = await cached_db.collection('users').findOne({
      address: userAddress,
      conversations: {
        $elemMatch: {
          matched_user: params.address
        }
      }
    });
    if (existing) {
      return json("Already added");
    }
    const filter = { address: userAddress };
    const updateDoc = {
      $push: {
        conversations: {
          matcheduser: params.address,
          createdat: new Date().getTime(),
          lastmessageat: new Date().getTime(),
          muted: false,
        }
      }
    };
    await cached_db.collection('users').updateOne(filter, updateDoc);
    let options = {
      projection: { conversations: 1 }
    }
    user = await cached_db.collection('users').updateOne({ address: userAddress }, options);
  } catch (err) {
    throw error(401, "Unauthorized");
  }
  return json("success");
}
