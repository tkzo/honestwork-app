import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { SkillInput } from '$lib/stores/Validation';
import { base } from '$app/paths';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  let skills: any;
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
    const url = `${base}/api/membership/${parsed.data.useraddress}`;
    const res = await fetch(url);
    const membership = await res.json();
    if (membership != 1 && membership != 2 && membership != 3) {
      throw error(400, "Bad Request");
    }
    let allowed = membership == 1 ? 3 : membership == 2 ? 6 : 8;
    skills = await cached_db.collection('skills').find({ useraddress: data.useraddress }).toArray();
    if (skills.length >= allowed) {
      throw error(400, "Membership limit reached");
    }
    let query = { useraddress: data.useraddress, slot: skills.length };
    let options = { upsert: true };
    let updt = {
      $set: {
        title: parsed.data.title,
        slot: skills.length,
        description: parsed.data.description,
        tags: parsed.data.tags,
        links: parsed.data.links,
        imageurls: parsed.data.imageurls,
        minimumprice: parsed.data.minimumprice,
        publish: parsed.data.publish,
        createdat: new Date().getTime(),
      },
    };
    await cached_db.collection('skills').updateOne(query, updt, options);
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json("success");
}
