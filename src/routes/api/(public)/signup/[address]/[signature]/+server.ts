import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { env as env_pub } from '$env/dynamic/public';
import { MongoClient, Db } from 'mongodb';
import { error } from '@sveltejs/kit';
import { verifyMember, checkMembership, getMemberTokenID } from '$lib/stores/Crypto';
import { base } from '$app/paths';

let cached_db: Db = "" as any;

export const POST: RequestHandler = async ({ params, fetch }) => {
  const uri =
    parseInt(env.PRODUCTION_ENV) == 1
      ? env.MONGODB_URI
      : env.PRIVATE_MONGODB_URI;
  let membership = await checkMembership(params.address as string);
  if (!membership) {
    throw error(401, "Unauthorized");
  }
  try {
    if (cached_db == "" as any) {
      const client = new MongoClient(uri!);
      await client.connect();
      cached_db = client.db("honestwork-cluster");
    }
    const salt = await cached_db.collection('salts').findOne({ address: params.address });
    if (salt == null) {
      throw error(401, "Unauthorized");
    }
    if (!verifyMember(salt.salt, params.address as string, params.signature as string)) {
      throw error(401, "Unauthorized");
    }
    const token_id = await getMemberTokenID(params.address as string)
    const token_data = await fetch(`${base}/api/alchemy/${env_pub.PUBLIC_NFT_ADDRESS}/${parseInt(token_id)}`);
    const token_json = await token_data.json();
    const token_image = token_json.image;
    const user = await cached_db.collection('users').findOne({ address: params.address });
    let updateDoc = {};
    if (user != null) {
      updateDoc = {
        $set: {
          salt: salt.salt,
        },
      };
    } else {
      updateDoc = {
        $set: {
          salt: salt.salt,
          username: params.address,
          email: "",
          showens: false,
          ensname: "",
          shownft: true,
          title: "",
          bio: "",
          imageurl: "",
          nfturl: token_image,
          nftaddress: env_pub.PUBLIC_NFT_ADDRESS,
          nftid: token_id.toString(),
          timezone: 0,
          links: ["", "", ""],
          rating: 0,
          watchlist: [],
          favorites: [],
          dmsopen: false,
          applications: [],
          conversations: [],
        },
      };
    }
    const filter = { address: params.address };
    const options = { upsert: true };
    await cached_db.collection('salts').deleteMany({ address: params.address });
    await cached_db.collection('users').updateOne(filter, updateDoc, options);
  } catch (err: any) {
    throw error(500, err.message);
  }
  return json("success");
};

