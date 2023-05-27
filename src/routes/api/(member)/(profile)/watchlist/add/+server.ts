import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies }) => {
  const userAddress = cookies.get("honestwork_address")!;
  const userSignature = cookies.get("honestwork_signature")!;
  let data = await request.json();
  let job: any;
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
      watchlist: {
        $elemMatch: {
          input: {
            address: data.address,
            slot: data.slot
          }
        }
      }
    });
    if (existing) {
      return json("Already in watchlist");
    }
    let user = await cached_db.collection('users').findOne({ address: userAddress });
    if (user == null) {
      throw error(401, "Unauthorized");
    }
    if (!verifyMember(user.salt, userAddress, userSignature)) {
      throw error(401, "Unauthorized");
    }
    job = await cached_db.collection('jobs').findOne({ useraddress: data.address, slot: data.slot });
    const filter = { address: userAddress };
    const options = { upsert: true };
    const updateDoc = {
      $push: {
        watchlist: {
          input: {
            address: data.address,
            slot: data.slot
          },
          username: job.username,
          title: job.title,
          imageurl: job.imageurl,
        },
      }
    };
    await cached_db.collection('users').updateOne(filter, updateDoc, options);
  } catch (err: any) {
    console.log("Error:", err);
    throw error(401, err.message);
  }
  return json("success");
}
