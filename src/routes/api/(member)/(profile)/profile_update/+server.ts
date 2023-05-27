import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { MongoClient, Db } from 'mongodb';
import { error, json } from '@sveltejs/kit';
import { ProfileInput } from '$lib/stores/Validation';
import { verifyMember } from '$lib/stores/Crypto';

let cached_db: Db = "" as any;
export const POST: RequestHandler = async ({ request, cookies }) => {
  const userAddress = cookies.get("honestwork_address");
  const userSignature = cookies.get("honestwork_signature");
  if (!userAddress || !userSignature) {
    throw error(401, "Unauthorized");
  }
  let data = await request.json();
  let parsed = ProfileInput.safeParse(data);
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
    let query = { address: userAddress };
    let options = { upsert: true };
    let updt = {
      $set: {
        username: parsed.data.username,
        showens: parsed.data.showens,
        ensname: parsed.data.ensname,
        title: parsed.data.title,
        nfturl: parsed.data.nfturl,
        shownft: parsed.data.shownft,
        dmsopen: parsed.data.dmsopen,
        timezone: parsed.data.timezone,
        nftaddress: parsed.data.nftaddress,
        nftid: parsed.data.nftid,
        email: parsed.data.email,
        bio: parsed.data.bio,
        links: parsed.data.links,
      },
    };
    await cached_db.collection('users').updateOne(query, updt, options);
    if (parsed.data.imageurl !== "") {
      await cached_db.collection('users').updateOne(query, { $set: { imageurl: parsed.data.imageurl } });
    }
  } catch (err) {
    throw error(400, "Bad Request");
  }
  return json("success");
}
