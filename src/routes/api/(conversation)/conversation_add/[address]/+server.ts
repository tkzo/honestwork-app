import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ params, cookies }) => {
  const userAddress = cookies.get("honestwork_address");
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
          matcheduser: params.address
        }
      }
    });
    let updated: boolean = false;
    if (!existing) {
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
      updated = true;
    }
    const existing2 = await cached_db.collection('users').findOne({
      address: params.address,
      conversations: {
        $elemMatch: {
          matcheduser: userAddress
        }
      }
    });
    let updated2: boolean = false;
    if (!existing2) {
      const filter2 = { address: params.address }
      const updateDoc2 = {
        $push: {
          conversations: {
            matcheduser: userAddress,
            createdat: new Date().getTime(),
            lastmessageat: new Date().getTime(),
            muted: false,
          }
        }
      };
      await cached_db.collection('users').updateOne(filter2, updateDoc2);
      updated2 = true;
    }
    if (!updated && !updated2) {
      throw error(500, "Conversation already exists");
    }
  } catch (err: any) {
    throw error(500, err.body.message);
  }
  return json("success");
}
