import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { SkillInput } from '$lib/stores/Validation';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, params, cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  let data = await request.json();
  let parsed = SkillInput.safeParse(data);
  if (!parsed.success) {
    throw error(400, "Bad Request");
  }
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
    let user = await cached_db.collection('users').findOne({ address: userAddress });
    if (user == null) {
      throw error(401, "Unauthorized");
    }
    let verified = verifyMember(user.salt, userAddress, userSignature);
    if (!verified) {
      throw error(401, "Unauthorized");
    }
    let query = { useraddress: data.useraddress, slot: parseInt(params.slot!) };
    let options = { upsert: true };
    let updt = {
      $set: {
        title: parsed.data.title,
        description: parsed.data.description,
        tags: parsed.data.tags,
        links: parsed.data.links,
        imageurls: parsed.data.imageurls,
        minimumprice: parsed.data.minimumprice,
        publish: parsed.data.publish,
      },
    };
    await cached_db.collection('skills').updateOne(query, updt, options);
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json("success");
}
