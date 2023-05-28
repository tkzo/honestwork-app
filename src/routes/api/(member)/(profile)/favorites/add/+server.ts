import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  let data = await request.json();
  let skill: any;
  let skills_user: any;
  const body = {
    address: data.address,
    slot: data.slot
  };
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
    skill = await cached_db.collection('skills').findOne({ useraddress: body.address, slot: body.slot });
    skills_user = await cached_db.collection('users').findOne({ address: body.address });
    let user = await cached_db.collection('users').findOne({ address: userAddress });
    if (user == null) {
      throw error(400, "Bad Request");
    }
    if (!verifyMember(user.salt, userAddress, userSignature)) {
      throw error(401, "Unauthorized");
    }
    const filter = { address: userAddress };
    const updateDoc = {
      $push: {
        favorites: {
          input: {
            address: body.address,
            slot: body.slot
          },
          username: skills_user.username,
          title: skill.title,
          imageurl: skill.imageurls[0],
        },
      }
    };
    await cached_db.collection('users').updateOne(filter, updateDoc);
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json("success");
}
